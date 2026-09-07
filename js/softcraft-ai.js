/* SoftCraft AI — global Railway chatbot */
'use strict';

const AI_API_URL = 'https://backend-production-c7ea.up.railway.app/api/chat';
const AI_TIMEOUT_MS = 25000;
const AI_GREETING = "Hi! I'm SoftCraft AI 👋\n\nI can help you choose the right website, software, AI solution, or digital growth service for your business.\n\nWhat are you looking to build?";
const AI_QUICK_ACTIONS = [
  ['🌐 Website', 'I need help choosing a website for my business.'],
  ['💻 Software', 'I need custom software for my business.'],
  ['🤖 AI Solution', 'I need an AI chatbot or automation solution.'],
  ['📈 SEO & Digital Growth', 'I need SEO and digital growth services.'],
  ['💰 Pricing', 'Please show me the relevant SoftCraft starting prices.'],
  ['📞 Talk to SoftCraft', 'I would like to talk to the SoftCraft team.']
];

(function () {
  let initialized = false;
  let messages = [];
  let lastFailedMessage = '';
  let isWaiting = false;

  function escapeHtml(value) {
    return value.replace(/[&<>'"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
  }

  function getWhatsAppUrl() {
    const userMessages = messages.filter(message => message.role === 'user').slice(-4);
    const summary = userMessages.length
      ? userMessages.map(message => `- ${message.content}`).join('\n')
      : 'No project details shared yet';
    const text = `Hi SoftCraft, I spoke with SoftCraft AI.\n\nConversation summary:\n${summary}\n\nI'd like to discuss this project.`;
    return `https://wa.me/919137958519?text=${encodeURIComponent(text)}`;
  }

  function buildMarkup() {
    return `
      <div class="softcraft-ai-root">
        <button class="softcraft-ai-launcher" type="button" aria-label="Ask SoftCraft AI" aria-controls="softcraft-ai-window" aria-expanded="false">
          <span class="softcraft-ai-icon" aria-hidden="true">✦</span><span>Ask SoftCraft AI</span>
        </button>
        <section class="softcraft-ai-window" id="softcraft-ai-window" role="dialog" aria-modal="false" aria-labelledby="softcraft-ai-title" hidden>
          <header class="softcraft-ai-header">
            <div class="softcraft-ai-brand">
              <div class="softcraft-ai-logo" aria-hidden="true">✦</div>
              <div><h2 class="softcraft-ai-title" id="softcraft-ai-title">SoftCraft AI</h2><p class="softcraft-ai-subtitle">Your AI Business &amp; Technology Consultant</p></div>
            </div>
            <div class="softcraft-ai-actions">
              <button class="softcraft-ai-icon-btn" type="button" data-ai-action="clear" aria-label="Clear chat" title="Clear chat">↺</button>
              <button class="softcraft-ai-icon-btn" type="button" data-ai-action="minimize" aria-label="Minimize chatbot" title="Minimize">−</button>
              <button class="softcraft-ai-icon-btn" type="button" data-ai-action="close" aria-label="Close chatbot" title="Close">×</button>
            </div>
          </header>
          <div class="softcraft-ai-body">
            <div class="softcraft-ai-messages" aria-live="polite" aria-label="SoftCraft AI conversation"></div>
            <div class="softcraft-ai-handoff">
              <a href="#" data-ai-whatsapp>Continue on WhatsApp</a>
              <a href="tel:+919137958519">Call</a>
              <a href="mailto:softcrafta@gmail.com">Email</a>
            </div>
            <div class="softcraft-ai-inputbar">
              <textarea class="softcraft-ai-input" rows="1" aria-label="Message SoftCraft AI" placeholder="Tell me about your business or project..."></textarea>
              <button class="softcraft-ai-send" type="button" aria-label="Send message">➤</button>
            </div>
          </div>
        </section>
      </div>`;
  }

  function renderMessage(message) {
    const messagesEl = document.querySelector('.softcraft-ai-messages');
    if (!messagesEl) return;
    const element = document.createElement('div');
    element.className = `softcraft-ai-message softcraft-ai-message--${message.role}`;
    element.textContent = message.content;
    messagesEl.appendChild(element);
  }

  function renderQuickActions() {
    const messagesEl = document.querySelector('.softcraft-ai-messages');
    if (!messagesEl || messagesEl.querySelector('.softcraft-ai-quick')) return;
    const actions = document.createElement('div');
    actions.className = 'softcraft-ai-quick';
    actions.setAttribute('aria-label', 'Suggested questions');
    actions.innerHTML = AI_QUICK_ACTIONS.map(([label, message]) => `<button type="button" data-ai-message="${escapeHtml(message)}">${label}</button>`).join('');
    messagesEl.appendChild(actions);
  }

  function renderConversation() {
    const messagesEl = document.querySelector('.softcraft-ai-messages');
    if (!messagesEl) return;
    messagesEl.innerHTML = '';
    messages.forEach(renderMessage);
    if (messages.length === 1) renderQuickActions();
    updateHandoff();
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function updateHandoff() {
    const whatsapp = document.querySelector('[data-ai-whatsapp]');
    if (whatsapp) whatsapp.href = getWhatsAppUrl();
  }

  function showTyping() {
    const messagesEl = document.querySelector('.softcraft-ai-messages');
    if (!messagesEl || document.getElementById('softcraft-ai-typing')) return;
    const typing = document.createElement('div');
    typing.id = 'softcraft-ai-typing';
    typing.className = 'softcraft-ai-message softcraft-ai-message--assistant';
    typing.innerHTML = '<span class="softcraft-ai-typing" aria-label="SoftCraft AI is typing"><span></span><span></span><span></span></span>';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTyping() { document.getElementById('softcraft-ai-typing')?.remove(); }

  function showError(message) {
    removeTyping();
    const messagesEl = document.querySelector('.softcraft-ai-messages');
    if (!messagesEl) return;
    const error = document.createElement('div');
    error.className = 'softcraft-ai-error';
    error.innerHTML = `${escapeHtml(message)}<br><button type="button" data-ai-action="retry">Try Again</button>`;
    messagesEl.appendChild(error);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  async function sendMessage(content) {
    const cleanContent = content.trim();
    if (!cleanContent || isWaiting) return;
    document.querySelector('.softcraft-ai-quick')?.remove();
    document.querySelector('.softcraft-ai-input').value = '';
    messages.push({ role: 'user', content: cleanContent });
    lastFailedMessage = cleanContent;
    renderMessage(messages[messages.length - 1]);
    updateHandoff();
    isWaiting = true;
    updateControls();
    showTyping();

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), AI_TIMEOUT_MS);
    try {
      const response = await fetch(AI_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
        signal: controller.signal
      });
      let data;
      try { data = await response.json(); } catch (_) { throw new Error('invalid-response'); }
      if (!response.ok || data.success === false) {
        const apiError = new Error('api-error');
        apiError.userMessage = typeof data.message === 'string' ? data.message : '';
        throw apiError;
      }
      if (!data.message || typeof data.message !== 'string') throw new Error('empty-response');
      removeTyping();
      messages.push({ role: 'assistant', content: data.message });
      renderMessage(messages[messages.length - 1]);
      updateHandoff();
    } catch (error) {
      showError(error.userMessage || "Sorry, I'm having trouble connecting right now. Please try again or contact SoftCraft directly.");
    } finally {
      window.clearTimeout(timeout);
      isWaiting = false;
      updateControls();
      document.querySelector('.softcraft-ai-input')?.focus();
    }
  }

  function updateControls() {
    const send = document.querySelector('.softcraft-ai-send');
    if (send) send.disabled = isWaiting;
  }

  function resetChat() {
    messages = [{ role: 'assistant', content: AI_GREETING }];
    lastFailedMessage = '';
    renderConversation();
  }

  function openChat() {
    const windowEl = document.getElementById('softcraft-ai-window');
    const launcher = document.querySelector('.softcraft-ai-launcher');
    if (!windowEl) return;
    windowEl.hidden = false;
    windowEl.classList.remove('is-minimized');
    launcher?.setAttribute('aria-expanded', 'true');
    document.querySelector('.softcraft-ai-input')?.focus();
  }

  function closeChat() {
    const windowEl = document.getElementById('softcraft-ai-window');
    windowEl?.setAttribute('hidden', '');
    document.querySelector('.softcraft-ai-launcher')?.setAttribute('aria-expanded', 'false');
  }

  function init() {
    if (initialized) return;
    initialized = true;
    document.body.insertAdjacentHTML('beforeend', buildMarkup());
    resetChat();
    document.addEventListener('click', event => {
      const launcher = event.target.closest('.softcraft-ai-launcher');
      if (launcher) return openChat();
      const action = event.target.closest('[data-ai-action]')?.dataset.aiAction;
      if (action === 'close') return closeChat();
      if (action === 'minimize') return document.getElementById('softcraft-ai-window')?.classList.toggle('is-minimized');
      if (action === 'clear') return resetChat();
      if (action === 'retry' && lastFailedMessage) return sendMessage(lastFailedMessage);
      const quick = event.target.closest('[data-ai-message]');
      if (quick) return sendMessage(quick.dataset.aiMessage);
    });
    document.querySelector('.softcraft-ai-send').addEventListener('click', () => sendMessage(document.querySelector('.softcraft-ai-input').value));
    document.querySelector('.softcraft-ai-input').addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); sendMessage(event.currentTarget.value); }
    });
    document.addEventListener('click', event => {
      const cta = event.target.closest('[data-open-softcraft-ai]');
      if (cta) { event.preventDefault(); openChat(); }
    });
    document.addEventListener('keydown', event => {
      const cta = event.target.closest('[data-open-softcraft-ai]');
      if (cta && (event.key === 'Enter' || event.key === ' ')) { event.preventDefault(); openChat(); }
    });
  }

  window.SoftCraftAI = { init, open: openChat };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
