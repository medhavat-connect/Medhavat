/**
 * analytics.js — Google Analytics 4 (GA4) & Consent Mode Integration
 * Handles GDPR/DPDP consent updates and smart conversion tracking for Medhavat.
 */
import { getCookieConsent } from './cookie-consent.js';

/**
 * Safely send an event to GA4 dataLayer
 * @param {string} eventName
 * @param {Record<string, any>} [params]
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, params);
    } catch (e) {
      console.warn('GA4 trackEvent error:', e);
    }
  }
}

/**
 * Update Google Consent Mode v2 based on user preferences
 * @param {Object} consent
 */
export function updateAnalyticsConsent(consent) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    const isAnalyticsGranted = !!(consent && consent.analytics);
    const isMarketingGranted = !!(consent && consent.marketing);

    window.gtag('consent', 'update', {
      analytics_storage: isAnalyticsGranted ? 'granted' : 'denied',
      ad_storage: isMarketingGranted ? 'granted' : 'denied',
      ad_user_data: isMarketingGranted ? 'granted' : 'denied',
      ad_personalization: isMarketingGranted ? 'granted' : 'denied'
    });
  }
}

/**
 * Track high-intent business interactions across the site
 */
function initIntentTracking() {
  document.addEventListener('click', (e) => {
    // 1. WhatsApp Clicks
    const waLink = e.target.closest('a[href*="wa.me"]');
    if (waLink) {
      trackEvent('click_to_chat', {
        channel: 'WhatsApp',
        link_url: waLink.href,
        page_location: window.location.pathname
      });
      return;
    }

    // 2. Direct Phone Calls
    const telLink = e.target.closest('a[href^="tel:"]');
    if (telLink) {
      trackEvent('click_to_call', {
        phone_number: telLink.href.replace('tel:', ''),
        page_location: window.location.pathname
      });
      return;
    }

    // 3. Email Inquiries
    const mailLink = e.target.closest('a[href^="mailto:"]');
    if (mailLink) {
      trackEvent('click_to_email', {
        email_address: mailLink.href.replace('mailto:', ''),
        page_location: window.location.pathname
      });
      return;
    }

    // 4. Primary High-Value CTA Clicks (e.g. Schedule Call, Explore Services)
    const ctaButton = e.target.closest('.btn--primary, .btn--outline, .hero__cta a');
    if (ctaButton && ctaButton.getAttribute('href') && !ctaButton.getAttribute('href').startsWith('#')) {
      const ctaText = ctaButton.textContent.trim().replace(/\s+/g, ' ');
      trackEvent('select_content', {
        content_type: 'CTA Button',
        item_id: ctaText,
        destination: ctaButton.getAttribute('href'),
        page_location: window.location.pathname
      });
    }
  }, { passive: true });
}

/**
 * Initialize Google Analytics Consent integration & smart business metrics
 */
export function initAnalytics() {
  // Sync consent state if user already previously consented
  const existing = getCookieConsent();
  if (existing) {
    updateAnalyticsConsent(existing);
  }

  // Listen for user consent changes from banner / modal
  window.addEventListener('cookieconsent', (e) => {
    if (e && e.detail) {
      updateAnalyticsConsent(e.detail);
    }
  });

  // Track key business actions
  initIntentTracking();
}
