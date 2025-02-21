class EmailFooterPreviewHandler {
  constructor() {
    this.footerSelect = document.getElementById('footer-select');
    this.nameInput = document.getElementById('name');
    this.jobInput = document.getElementById('job');
    this.phoneInput = document.getElementById('phone');
    this.emailInput = document.getElementById('email');
    this.webUrlInput = document.getElementById('web-url');
    this.linkedInInput = document.getElementById('linkedin-url');
    this.facebookInput = document.getElementById('facebook-url');
    this.consentInput = document.getElementById('consent');
    this.previewElement = document.getElementById('footer-preview');

    this.defaultValues = {
      name: 'John Doe',
      job: 'Software Engineer',
      phone: '+48 123 456 789',
      email: 'john@example.com',
      webUrl: 'www.piko24.pl',
      linkedInUrl: 'https://www.linkedin.com/in/johndoe',
      facebookUrl: 'https://www.facebook.com/johndoe',
      consent: 'Piko24 sp. z o.o., adres: Rynek 2, 43-190 Mikołów, KRS: 0001119063, NIP: 6351871858, REGON: 529292987, kapitał zakładowy 1.000.000,00 zł. RODO',
    };

    this.originalTemplate = '';

    this.init();
  }

  init() {
    this.attachEventListeners();
    this.loadFooterTemplate(this.footerSelect.value);
  }

  attachEventListeners() {
    this.footerSelect.addEventListener('change', () => this.loadFooterTemplate(this.footerSelect.value));
    this.nameInput.addEventListener('input', () => this.updatePreview());
    this.jobInput.addEventListener('input', () => this.updatePreview());
    this.phoneInput.addEventListener('input', () => this.updatePreview());
    this.emailInput.addEventListener('input', () => this.updatePreview());
    this.webUrlInput.addEventListener('input', () => this.updatePreview());
    this.linkedInInput.addEventListener('input', () => this.updatePreview());
    this.facebookInput.addEventListener('input', () => this.updatePreview());
    this.consentInput.addEventListener('input', () => this.updatePreview());
  }

  async loadFooterTemplate(templateFile) {
    try {
      const response = await fetch(`footers/${templateFile}`);
      this.originalTemplate = await response.text();
      this.previewElement.innerHTML = this.originalTemplate;
      this.updatePreview();
    } catch (error) {
      console.error('Error loading template:', error);
      this.previewElement.innerHTML = '<p>Error loading footer template.</p>';
    }
  }

  updatePreview() {
    if (!this.originalTemplate) {
      return;
    }

    const name = this.nameInput.value || this.defaultValues.name;
    const job = this.jobInput.value || this.defaultValues.job;
    const phone = this.phoneInput.value || this.defaultValues.phone;
    const email = this.emailInput.value || this.defaultValues.email;
    const webUrl = this.webUrlInput.value || this.defaultValues.webUrl;
    const linkedInUrl = this.linkedInInput.value || this.defaultValues.linkedInUrl;
    const facebookUrl = this.facebookInput.value || this.defaultValues.facebookUrl;
    const consent = this.consentInput.value || this.defaultValues.consent;

    let updatedHTML = this.originalTemplate
      .replace(/\[NAME\]/g, name)
      .replace(/\[EMAIL\]/g, email)
      .replace(/\[JOB\]/g, job)
      .replace(/\[PHONE\]/g, phone)
      .replace(/\[WEB_URL\]/g, webUrl)
      .replace(/\[LINKEDIN_URL\]/g, linkedInUrl)
      .replace(/\[FACEBOOK_URL\]/g, facebookUrl)
      .replace(/\[CONSENT\]/g, consent);

    this.previewElement.innerHTML = updatedHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => new EmailFooterPreviewHandler());
