// Инициализация AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

// Система синхронизации данных с админ-панелью
class SiteDataManager {
    constructor() {
        this.init();
    }

    init() {
        this.loadData();
        this.updateSiteContent();
        this.setupStorageListener();
    }

    loadData() {
        // Загружаем данные из localStorage или используем значения по умолчанию
        this.trainers = JSON.parse(localStorage.getItem('adminTrainers')) || this.getDefaultTrainers();
        this.sports = JSON.parse(localStorage.getItem('adminSports')) || this.getDefaultSports();
        this.schedule = JSON.parse(localStorage.getItem('adminSchedule')) || this.getDefaultSchedule();
        this.content = JSON.parse(localStorage.getItem('adminContent')) || this.getDefaultContent();
        this.articles = JSON.parse(localStorage.getItem('adminArticles')) || this.getDefaultArticles();
    }

    getDefaultTrainers() {
        return [
            {
                id: 1,
                name: "Пак пон док",
                title: "Гранд Мастер по тхэквондо ITF - 9 дан",
                description: "Опыт преподавания 15 лет. Чемпион России по тхэквондо, черный пояс 4 дан. Специализируется на технике ударов ногами и подготовке к соревнованиям.",
                image: "img/noroot.png",
                specialties: ["Тхэквондо"]
            },
            {
                id: 2,
                name: "Абдулложонов Заррух",
                title: "Тренер по тхэквондо ITF - 1 дан",
                description: "Профессиональный боксер с опытом 20 боев. Тренерский стаж 8 лет. Эксперт по технике ударов руками и тактической подготовке.",
                image: "img/noroot2.png",
                specialties: ["Тхэквондо"]
            },
            {
                id: 3,
                name: "Максим Рейтер",
                title: "Тренер по боксу",
                description: "Чемпион области по дзюдо, опыт работы с детьми и взрослыми 12 лет. Специалист по технике бросков и борьбе в партере.",
                image: "img/noroot1.png",
                specialties: ["Бокс"]
            },
            {
                id: 4,
                name: "Иван Ларин",
                title: "Тренер по карате",
                description: "Опыт преподавания 10 лет. Специалист по традиционному карате и ката. Помогает развивать духовные аспекты единоборств.",
                image: "img/noroot3.png",
                specialties: ["Карате"]
            }
        ];
    }

    getDefaultSports() {
        return [
            {
                id: 1,
                name: "Тхэквондо",
                description: "Корейское боевое искусство, известное своими высокими ударами ногами и быстрыми движениями. Развивает гибкость, координацию и скорость.",
                icon: "fas fa-fist-raised",
                features: ["Техника ударов ногами", "Поединки и спарринги", "Подготовка к соревнованиям", "Получение поясов"]
            },
            {
                id: 2,
                name: "Бокс",
                description: "Классический вид единоборств, развивающий силу удара, выносливость и тактическое мышление. Идеально подходит для самообороны.",
                icon: "fas fa-boxing-glove",
                features: ["Техника ударов руками", "Работа в парах", "Бой с тенью", "Работа на мешках"]
            },
            {
                id: 3,
                name: "Карате",
                description: "Традиционное японское боевое искусство, сочетающее в себе технику ударов руками и ногами с философией самосовершенствования.",
                icon: "fas fa-hand-rock",
                features: ["Ката (формальные упражнения)", "Кумите (спарринг)", "Техника блоков", "Духовное развитие"]
            },
            {
                id: 4,
                name: "Дзюдо",
                description: "Японское боевое искусство, основанное на принципе использования силы противника против него самого. Развивает ловкость и тактику.",
                icon: "fas fa-wrestling",
                features: ["Техника бросков", "Борьба в партере", "Удушающие приемы", "Болевые приемы"]
            }
        ];
    }

    getDefaultSchedule() {
        return {
            monday: [
                { time: "16:00 - 17:00", sport: "Тхэквондо (дети 6-10 лет)", trainer: "А. Петров" },
                { time: "17:30 - 18:30", sport: "Бокс (подростки)", trainer: "М. Соколов" },
                { time: "19:00 - 20:30", sport: "Карате (взрослые)", trainer: "А. Петров" }
            ],
            tuesday: [
                { time: "16:00 - 17:00", sport: "Дзюдо (дети 8-12 лет)", trainer: "Д. Иванов" },
                { time: "17:30 - 18:30", sport: "Тхэквондо (подростки)", trainer: "А. Петров" },
                { time: "19:00 - 20:30", sport: "Бокс (взрослые)", trainer: "М. Соколов" }
            ],
            wednesday: [
                { time: "16:00 - 17:00", sport: "Карате (дети 6-10 лет)", trainer: "А. Петров" },
                { time: "17:30 - 18:30", sport: "Дзюдо (подростки)", trainer: "Д. Иванов" },
                { time: "19:00 - 20:30", sport: "Тхэквондо (взрослые)", trainer: "А. Петров" }
            ],
            thursday: [
                { time: "16:00 - 17:00", sport: "Бокс (дети 8-12 лет)", trainer: "М. Соколов" },
                { time: "17:30 - 18:30", sport: "Карате (подростки)", trainer: "А. Петров" },
                { time: "19:00 - 20:30", sport: "Дзюдо (взрослые)", trainer: "Д. Иванов" }
            ],
            friday: [
                { time: "16:00 - 17:00", sport: "Тхэквондо (дети 6-10 лет)", trainer: "А. Петров" },
                { time: "17:30 - 18:30", sport: "Бокс (подростки)", trainer: "М. Соколов" },
                { time: "19:00 - 20:30", sport: "Карате (взрослые)", trainer: "А. Петров" }
            ],
            saturday: [
                { time: "10:00 - 11:00", sport: "Общая физическая подготовка", trainer: "Все тренеры" },
                { time: "11:30 - 12:30", sport: "Спарринги", trainer: "Все тренеры" }
            ],
            sunday: [
                { time: "10:00 - 11:00", sport: "Растяжка и йога", trainer: "Все тренеры" },
                { time: "11:30 - 12:30", sport: "Техническая подготовка", trainer: "Все тренеры" }
            ]
        };
    }

    getDefaultContent() {
        return {
            hero: {
                title: "Развиваем силу, выносливость и характер",
                subtitle: "Профессиональная спортивная школа единоборств",
                description: "Присоединяйтесь к нашей команде и станьте сильнее физически и духовно"
            },
            about: {
                title: "О нашей школе",
                description: "Спортивная школа 'Молодая Гвардия' - это место, где каждый может найти свой путь в мире единоборств. Мы предлагаем профессиональное обучение различным видам боевых искусств под руководством опытных тренеров."
            },
            contact: {
                address: "г. Москва, ул. Спортивная, д. 15",
                phone: "+7 (495) 123-45-67",
                email: "info@molodaya-gvardiya.ru",
                workingHours: "Пн-Пт: 9:00-22:00, Сб-Вс: 10:00-20:00"
            }
        };
    }

    getDefaultArticles() {
        return [
            {
                id: 1,
                title: "Польза единоборств для детей",
                content: "Единоборства - это не только спорт, но и отличный способ развития личности ребенка. Они помогают развивать дисциплину, уверенность в себе и физическую силу. В нашей статье мы расскажем о том, как единоборства влияют на развитие детей и почему стоит отдать ребенка в секцию единоборств.",
                excerpt: "Единоборства - это не только спорт, но и отличный способ развития личности ребенка. Они помогают развивать дисциплину, уверенность в себе и физическую силу.",
                published: true,
                date: "2024-01-15",
                author: "Тренерский состав"
            },
            {
                id: 2,
                title: "Техника ударов в тхэквондо",
                content: "Тхэквондо - это корейское боевое искусство, известное своими высокими ударами ногами. В этой статье мы рассмотрим основные техники ударов, их правильное выполнение и тренировочные упражнения для улучшения техники.",
                excerpt: "Тхэквондо - это корейское боевое искусство, известное своими высокими ударами ногами. В этой статье мы рассмотрим основные техники ударов.",
                published: true,
                date: "2024-01-10",
                author: "Пак пон док"
            },
            {
                id: 3,
                title: "Питание для спортсменов-единоборцев",
                content: "Правильное питание играет ключевую роль в достижении спортивных результатов. В этой статье мы расскажем о принципах питания для спортсменов-единоборцев, рекомендуемых продуктах и режиме питания.",
                excerpt: "Правильное питание играет ключевую роль в достижении спортивных результатов. В этой статье мы расскажем о принципах питания для спортсменов.",
                published: true,
                date: "2024-01-05",
                author: "Тренерский состав"
            }
        ];
    }

    updateSiteContent() {
        this.updateTrainers();
        this.updateSports();
        this.updateSchedule();
        this.updateContent();
        this.updateArticles();
    }

    updateTrainers() {
        const trainersContainer = document.querySelector('.trainers-grid');
        if (!trainersContainer) return;

        trainersContainer.innerHTML = this.trainers.map(trainer => `
            <div class="trainer-card" data-aos="fade-up" data-aos-delay="${trainer.id * 100}">
                <div class="trainer-image">
                    <img src="${trainer.image}" alt="Тренер ${trainer.name}">
                </div>
                <div class="trainer-info">
                    <h3>${trainer.name}</h3>
                    <p class="trainer-title">${trainer.title}</p>
                    <p>${trainer.description}</p>
                    <div class="trainer-specialties">
                        ${trainer.specialties.map(specialty => `<span class="specialty">${specialty}</span>`).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }

    updateSports() {
        const sportsContainer = document.querySelector('.sports-grid');
        if (!sportsContainer) return;

        sportsContainer.innerHTML = this.sports.map(sport => `
            <div class="sport-card" data-aos="fade-up" data-aos-delay="${sport.id * 100}">
                <div class="sport-icon">
                    <i class="${sport.icon}"></i>
                </div>
                <h3>${sport.name}</h3>
                <p>${sport.description}</p>
                <ul>
                    ${sport.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <a href="#contact" class="btn btn-outline">Записаться</a>
            </div>
        `).join('');
    }

    updateSchedule() {
        const scheduleContainer = document.querySelector('.schedule-table');
        if (!scheduleContainer) return;

        const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        const dayNames = {
            monday: 'Понедельник',
            tuesday: 'Вторник',
            wednesday: 'Среда',
            thursday: 'Четверг',
            friday: 'Пятница',
            saturday: 'Суббота',
            sunday: 'Воскресенье'
        };

        scheduleContainer.innerHTML = days.map(day => `
            <div class="schedule-day" data-day="${day}">
                <h3>${dayNames[day]}</h3>
                <div class="schedule-items">
                    ${this.schedule[day] ? this.schedule[day].map(item => `
                        <div class="schedule-item">
                            <span class="time">${item.time}</span>
                            <span class="sport">${item.sport}</span>
                            <span class="trainer">${item.trainer}</span>
                        </div>
                    `).join('') : ''}
                </div>
            </div>
        `).join('');
    }

    updateContent() {
        // Обновляем контент в hero секции
        const heroTitle = document.querySelector('.hero h1');
        const heroSubtitle = document.querySelector('.hero h2');
        const heroDescription = document.querySelector('.hero p');

        if (heroTitle && this.content.hero.title) heroTitle.textContent = this.content.hero.title;
        if (heroSubtitle && this.content.hero.subtitle) heroSubtitle.textContent = this.content.hero.subtitle;
        if (heroDescription && this.content.hero.description) heroDescription.textContent = this.content.hero.description;

        // Обновляем контент в about секции
        const aboutTitle = document.querySelector('#about h2');
        const aboutDescription = document.querySelector('#about p');

        if (aboutTitle && this.content.about.title) aboutTitle.textContent = this.content.about.title;
        if (aboutDescription && this.content.about.description) aboutDescription.textContent = this.content.about.description;

        // Обновляем контактную информацию
        const contactAddress = document.querySelector('.contact-info .address');
        const contactPhone = document.querySelector('.contact-info .phone');
        const contactEmail = document.querySelector('.contact-info .email');
        const contactHours = document.querySelector('.contact-info .hours');

        if (contactAddress && this.content.contact.address) contactAddress.textContent = this.content.contact.address;
        if (contactPhone && this.content.contact.phone) contactPhone.textContent = this.content.contact.phone;
        if (contactEmail && this.content.contact.email) contactEmail.textContent = this.content.contact.email;
        if (contactHours && this.content.contact.workingHours) contactHours.textContent = this.content.contact.workingHours;
    }

    updateArticles() {
        const articlesContainer = document.querySelector('.articles-grid');
        if (!articlesContainer) return;

        // Фильтруем только опубликованные статьи
        const publishedArticles = this.articles.filter(article => article.published);
        
        if (publishedArticles.length === 0) {
            articlesContainer.innerHTML = `
                <div class="no-articles">
                    <i class="fas fa-newspaper"></i>
                    <h3>Статьи пока не добавлены</h3>
                    <p>Скоро здесь появятся интересные статьи о единоборствах</p>
                </div>
            `;
            return;
        }

        articlesContainer.innerHTML = publishedArticles.map(article => `
            <div class="article-card" data-aos="fade-up" data-aos-delay="${article.id * 100}">
                <div class="article-image">
                    <i class="fas fa-newspaper"></i>
                </div>
                <div class="article-content">
                    <div class="article-meta">
                        <div class="article-date">
                            <i class="fas fa-calendar"></i>
                            ${new Date(article.date).toLocaleDateString('ru-RU')}
                        </div>
                        <span class="article-status published">Опубликовано</span>
                    </div>
                    <h3 class="article-title">${article.title}</h3>
                    <p class="article-excerpt">${article.excerpt}</p>
                    <div class="article-actions">
                        <span class="article-author">Автор: ${article.author}</span>
                        <a href="#" class="read-more" onclick="showArticleModal(${article.id})">
                            Читать далее <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    setupStorageListener() {
        // Слушаем изменения в localStorage
        window.addEventListener('storage', (e) => {
            if (e.key && e.key.startsWith('admin')) {
                this.loadData();
                this.updateSiteContent();
                showNotification('Контент сайта обновлен!', 'success');
            }
        });

        // Также слушаем события от админ-панели в той же вкладке
        window.addEventListener('adminDataChanged', () => {
            this.loadData();
            this.updateSiteContent();
            showNotification('Контент сайта обновлен!', 'success');
        });
    }

    // Метод для принудительного обновления данных
    refreshData() {
        this.loadData();
        this.updateSiteContent();
        console.log('Данные обновлены:', {
            trainers: this.trainers.length,
            sports: this.sports.length,
            schedule: Object.keys(this.schedule).length,
            content: this.content
        });
    }

    // Метод для отладки
    debugData() {
        console.log('Текущие данные:', {
            trainers: this.trainers,
            sports: this.sports,
            schedule: this.schedule,
            content: this.content
        });
    }
}

// Инициализируем менеджер данных
const siteDataManager = new SiteDataManager();

// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Добавляем/убираем класс для блокировки скролла
    if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
});

// Закрытие мобильного меню при клике на ссылку
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
}));

// Закрытие мобильного меню при клике вне меню
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Кнопка админ-панели
const adminPanelBtn = document.getElementById('adminPanelBtn');
if (adminPanelBtn) {
    adminPanelBtn.addEventListener('click', function() {
        // Закрываем мобильное меню если оно открыто
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Показываем модальное окно с формой входа
        showAdminLoginModal();
    });
}

// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Изменение навигации при прокрутке
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Фильтрация расписания
const filterButtons = document.querySelectorAll('.filter-btn');
const scheduleDays = document.querySelectorAll('.schedule-day');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Удаляем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс к нажатой кнопке
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        scheduleDays.forEach(day => {
            if (filter === 'all' || day.getAttribute('data-day') === filter) {
                day.style.display = 'block';
                day.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                day.style.display = 'none';
            }
        });
    });
});

// Анимация появления для расписания
const fadeInKeyframes = [
    { opacity: 0, transform: 'translateY(20px)' },
    { opacity: 1, transform: 'translateY(0)' }
];

const fadeInOptions = {
    duration: 500,
    easing: 'ease-in-out'
};

// Обработка формы контактов
const contactForm = document.getElementById('contactForm');
const formLoading = document.getElementById('formLoading');
const submitBtn = document.querySelector('.submit-btn');

// Маска для телефона
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.startsWith('7')) {
                value = value.substring(1);
            }
            if (value.length > 0) {
                value = '+7 (' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 8) + '-' + value.substring(8, 10);
            }
        }
        e.target.value = value;
    });

    // Обработка вставки из буфера обмена
    phoneInput.addEventListener('paste', function(e) {
        e.preventDefault();
        let pastedText = (e.clipboardData || window.clipboardData).getData('text');
        let value = pastedText.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.startsWith('7')) {
                value = value.substring(1);
            }
            if (value.length > 0) {
                value = '+7 (' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 8) + '-' + value.substring(8, 10);
            }
        }
        this.value = value;
    });
}

// Валидация полей в реальном времени
const formFields = contactForm ? contactForm.querySelectorAll('input, select, textarea') : [];
formFields.forEach(field => {
    field.addEventListener('blur', validateField);
    field.addEventListener('input', clearFieldError);
});

function validateField(e) {
    const field = e.target;
    const errorElement = document.getElementById(field.id + '-error');
    let isValid = true;
    let errorMessage = '';

    // Очищаем предыдущую ошибку
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }

    // Валидация по типам полей
    switch (field.type) {
        case 'text':
            if (field.value.trim().length < 2) {
                isValid = false;
                errorMessage = 'Имя должно содержать минимум 2 символа';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Введите корректный email адрес';
            }
            break;
        case 'tel':
            const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
            if (!phoneRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Введите корректный номер телефона';
            }
            break;
        case 'select-one':
            if (!field.value) {
                isValid = false;
                errorMessage = 'Пожалуйста, выберите вариант';
            }
            break;
    }

    // Показываем ошибку если поле невалидно
    if (!isValid && errorElement) {
        errorElement.textContent = errorMessage;
        errorElement.classList.add('show');
        field.style.borderColor = '#e74c3c';
    } else if (errorElement) {
        errorElement.classList.remove('show');
        field.style.borderColor = '#e0e0e0';
    }

    return isValid;
}

function clearFieldError(e) {
    const field = e.target;
    const errorElement = document.getElementById(field.id + '-error');
    
    if (errorElement) {
        errorElement.classList.remove('show');
    }
    
    if (field.style.borderColor === 'rgb(231, 76, 60)') {
        field.style.borderColor = '#e0e0e0';
    }
}

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Валидируем все поля
        let isValid = true;
        formFields.forEach(field => {
            if (!validateField({ target: field })) {
                isValid = false;
            }
        });

        if (!isValid) {
            showNotification('Пожалуйста, исправьте ошибки в форме', 'error');
            return;
        }

        // Получаем данные формы
        const formData = new FormData(this);
        const formDataObj = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            sport: formData.get('sport'),
            age: formData.get('age'),
            message: formData.get('message')
        };

        // Показываем индикатор загрузки
        if (submitBtn) submitBtn.style.display = 'none';
        if (formLoading) formLoading.classList.add('show');

        // Имитация отправки формы
        setTimeout(() => {
            // Скрываем индикатор загрузки
            if (formLoading) formLoading.classList.remove('show');
            if (submitBtn) submitBtn.style.display = 'inline-flex';

            // Показываем уведомление об успехе
            showNotification('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
            
            // Сохраняем заявку в localStorage для админ-панели
            const contact = {
                id: Date.now(),
                name: formDataObj.name,
                phone: formDataObj.phone,
                email: formDataObj.email,
                sport: formDataObj.sport,
                age: formDataObj.age,
                message: formDataObj.message,
                date: new Date().toISOString().split('T')[0]
            };
            
            // Получаем существующие заявки
            let existingContacts = JSON.parse(localStorage.getItem('adminContacts') || '[]');
            existingContacts.push(contact);
            localStorage.setItem('adminContacts', JSON.stringify(existingContacts));
            
            // Очищаем форму
            this.reset();
            
            // Очищаем все ошибки
            document.querySelectorAll('.form-error').forEach(error => {
                error.classList.remove('show');
            });
            
            // Сбрасываем стили полей
            formFields.forEach(field => {
                field.style.borderColor = '#e0e0e0';
            });
        }, 2000);
    });
}

// Система уведомлений
function showNotification(message, type = 'info') {
    // Удаляем существующие уведомления
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Добавляем стили
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Кнопка закрытия
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Автоматическое закрытие через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Анимация счетчиков (для статистики)
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 секунды
        const increment = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Lazy loading для изображений
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Параллакс эффект для героя
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
}

// Добавляем обработчик прокрутки для параллакса
window.addEventListener('scroll', parallaxEffect);

// Анимация карточек при наведении
document.querySelectorAll('.sport-card, .trainer-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Анимация кнопок
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Создаем эффект пульсации
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Добавляем CSS для анимации ripple
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Анимация загрузки страницы
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Инициализируем lazy loading
    lazyLoadImages();
    
    // Запускаем анимацию счетчиков если они есть
    if (document.querySelector('.counter')) {
        animateCounters();
    }
});

// Добавляем CSS для анимации загрузки
const loadingStyle = document.createElement('style');
loadingStyle.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(loadingStyle);

// Обработка ошибок изображений
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
        this.alt = 'Изображение не найдено';
    });
});

// Анимация появления элементов при скролле (дополнительная)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Наблюдаем за элементами для анимации
document.querySelectorAll('.sport-card, .trainer-card, .schedule-day, .contact-item').forEach(el => {
    observer.observe(el);
});

// Добавляем CSS для дополнительной анимации
const additionalAnimationStyle = document.createElement('style');
additionalAnimationStyle.textContent = `
    .sport-card, .trainer-card, .schedule-day, .contact-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .sport-card.animate-in, .trainer-card.animate-in, .schedule-day.animate-in, .contact-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(additionalAnimationStyle);

// Функция для показа модального окна (если понадобится)
function showModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            ${content}
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        position: relative;
        transform: scale(0.7);
        transition: transform 0.3s ease;
    `;
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 15px;
        font-size: 2rem;
        cursor: pointer;
        color: #666;
        border: none;
        background: none;
    `;
    
    document.body.appendChild(modal);
    
    // Анимация появления
    setTimeout(() => {
        modal.style.opacity = '1';
        modalContent.style.transform = 'scale(1)';
    }, 10);
    
    // Закрытие модального окна
    const closeModal = () => {
        modal.style.opacity = '0';
        modalContent.style.transform = 'scale(0.7)';
        setTimeout(() => modal.remove(), 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

// Функция показа модального окна входа в админ-панель
function showAdminLoginModal() {
    const modalContent = `
        <div class="admin-login-modal">
            <div class="admin-login-header">
                <img src="img/logo.png" alt="Логотип" class="admin-login-logo">
                <h3>Вход в админ-панель</h3>
                <p>Введите данные для доступа к системе управления</p>
            </div>
            <form id="adminLoginForm" class="admin-login-form">
                <div class="form-group">
                    <label for="adminUsername">
                        <i class="fas fa-user"></i>
                        Логин
                    </label>
                    <input type="text" id="adminUsername" name="username" required placeholder="Введите логин">
                </div>
                <div class="form-group">
                    <label for="adminPassword">
                        <i class="fas fa-lock"></i>
                        Пароль
                    </label>
                    <input type="password" id="adminPassword" name="password" required placeholder="Введите пароль">
                </div>
                <div class="admin-login-actions">
                    <button type="submit" class="btn btn-primary">
                        <i class="fas fa-sign-in-alt"></i>
                        Войти
                    </button>
                    <button type="button" class="btn btn-outline" onclick="closeAdminLoginModal()">
                        Отмена
                    </button>
                </div>
            </form>
            <div class="admin-login-footer">
                <p><small>По умолчанию: admin / admin123</small></p>
            </div>
        </div>
    `;

    // Создаем модальное окно
    const modal = document.createElement('div');
    modal.className = 'admin-modal-overlay';
    modal.innerHTML = modalContent;
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
        padding: 20px;
    `;

    document.body.appendChild(modal);

    // Анимация появления
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);

    // Обработчик формы входа
    const loginForm = document.getElementById('adminLoginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const username = formData.get('username');
        const password = formData.get('password');

        if (username === 'admin' && password === 'admin123') {
            // Показываем индикатор загрузки
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Вход...';
            submitBtn.disabled = true;

            showNotification('Успешный вход! Перенаправляем в админ-панель...', 'success');
            setTimeout(() => {
                window.open('admin/', '_blank');
                closeAdminLoginModal();
            }, 1500);
        } else {
            showNotification('Неверный логин или пароль', 'error');
        }
    });

    // Закрытие по клику вне модального окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeAdminLoginModal();
        }
    });

    // Закрытие по нажатию Escape
    const handleEscape = function(e) {
        if (e.key === 'Escape') {
            closeAdminLoginModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
}

// Функция закрытия модального окна входа
function closeAdminLoginModal() {
    const modal = document.querySelector('.admin-modal-overlay');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Функция показа модального окна статьи
function showArticleModal(articleId) {
    const article = siteDataManager.articles.find(a => a.id === articleId);
    if (!article) return;

    const modalContent = `
        <div class="article-modal">
            <div class="article-modal-header">
                <h2>${article.title}</h2>
                <div class="article-modal-meta">
                    <span class="article-date">
                        <i class="fas fa-calendar"></i>
                        ${new Date(article.date).toLocaleDateString('ru-RU')}
                    </span>
                    <span class="article-author">
                        <i class="fas fa-user"></i>
                        ${article.author}
                    </span>
                </div>
            </div>
            <div class="article-modal-content">
                ${article.content.split('\n').map(paragraph => 
                    paragraph.trim() ? `<p>${paragraph}</p>` : ''
                ).join('')}
            </div>
            <div class="article-modal-footer">
                <button class="btn btn-outline" onclick="closeArticleModal()">
                    <i class="fas fa-times"></i>
                    Закрыть
                </button>
            </div>
        </div>
    `;

    showModal(article.title, modalContent);
}

// Функция закрытия модального окна статьи
function closeArticleModal() {
    closeModal();
}

// Функция загрузки дополнительных статей
function loadMoreArticles() {
    // Пока просто показываем уведомление
    showNotification('Функция загрузки дополнительных статей будет добавлена позже', 'info');
}

// Экспортируем функции для возможного использования
window.MolodayaGvardiya = {
    showNotification,
    showModal,
    animateCounters,
    showAdminLoginModal,
    closeAdminLoginModal,
    showArticleModal,
    closeArticleModal,
    loadMoreArticles
}; 