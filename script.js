class EmailFooterPreviewHandler {
  template = null;

  templatesMap = {
    'v1.html': 'v1',
    'v2.html': 'v2',
    'shelfio-v2.html': 'shelfio-v2',
  };

  defaultTemplateValues = {
    'shelfio-v2': {
      webUrl: 'www.shopbox.pl',
      webUrlDisplay: 'www.shelfio.com',
      consent: 'Shelfio Sp. z o.o., ul. Franciszka Klimczaka 1, 02-797 Warszawa, wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego prowadzonego przez Sąd Rejonowy dla Krakowa Śródmieścia w Krakowie, XI Wydział Gospodarczy Krajowego Rejestru Sądowego pod numerem KRS: 0000881197, posiadającą numer NIP: 6751744626 oraz REGON: 388061653, <a href="https://shopbox.pl/privacy-policy" style="text-decoration: underline; color: #000000;" target="_blank">RODO</a>.'
    },
  };

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
      webUrlDisplay: 'www.piko24.pl',
      linkedInUrl: 'https://www.linkedin.com/in/johndoe',
      facebookUrl: 'https://www.facebook.com/johndoe',
      consent: 'Piko24 sp. z o.o., adres: Rynek 2, 43-190 Mikołów, KRS: 0001119063, NIP: 6351871858, REGON: 529292987, kapitał zakładowy 1.000.000,00 zł. <a href="https://www.piko24.pl/rodo" style="text-decoration: underline; color: #000000;" target="_blank">RODO</a>',
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
      this.template = this.templatesMap[templateFile];

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
    const linkedInUrl = this.linkedInInput.value || this.defaultValues.linkedInUrl;
    const facebookUrl = this.facebookInput.value || this.defaultValues.facebookUrl;

    let webUrl = this.webUrlInput.value || this.defaultValues.webUrl;
    let webUrlDisplay = this.webUrlInput.value || this.defaultValues.webUrl;
    let consent = this.consentInput.value || this.defaultValues.consent;

    if (this.template === 'shelfio-v2') {
      webUrl = this.defaultTemplateValues['shelfio-v2'].webUrl;
      webUrlDisplay = this.defaultTemplateValues['shelfio-v2'].webUrlDisplay;
      consent = this.defaultTemplateValues['shelfio-v2'].consent;
    }

    let updatedHTML = this.originalTemplate
      .replace(/\[NAME\]/g, name)
      .replace(/\[EMAIL\]/g, email)
      .replace(/\[JOB\]/g, job)
      .replace(/\[PHONE\]/g, phone)
      .replace(/\[WEB_URL\]/g, webUrl)
      .replace(/\[WEB_URL_DISPLAY\]/g, webUrlDisplay)
      .replace(/\[LINKEDIN_URL\]/g, linkedInUrl)
      .replace(/\[FACEBOOK_URL\]/g, facebookUrl)
      .replace(/\[CONSENT\]/g, consent);

    this.previewElement.innerHTML = updatedHTML;
  }
}

document.addEventListener('DOMContentLoaded', () => new EmailFooterPreviewHandler());
