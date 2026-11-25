
import { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [search, setSearch] = useState('');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Ошибка загрузки товаров:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

    useEffect(() => {
    fetch('http://localhost:5000/api/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error('Ошибка загрузки категорий:', error);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    `${product.product_name} ${product.article}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
  
  <div className="app">
    <header className="site-header">
      <div className="topbar">
        НСО · Новосибирск / Барнаул / Томск / Кемерово
      </div>

      <div className="header-main">
        <a className="brand" href="#">
          <span className="brand-icon">С</span>
          <span>
            <strong>СИБВЕНТ</strong>
            <small>МАТЕРИАЛЫ И ИНЖЕНЕРНЫЕ СИСТЕМЫ</small>
          </span>
        </a>

        <div className="header-phone">
          <strong>+7 (000) 000-00-00</strong>
          <span>Заказать звонок · демо</span>
        </div>

        <div className="header-actions">
          <span>♡ Избранное</span>
          <span>♙ Вход</span>
          <span>🛒 Корзина · 14</span>
        </div>
      </div>

      <div className="header-nav">
        <button className="catalog-button">☰ Каталог материалов</button>

        <div className="header-search">
          <input
            type="text"
            placeholder="Название, артикул или диаметр материала"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <span>⌕</span>
        </div>

        <nav>
          <a href="#services">Услуги</a>
          <a href="#delivery">Доставка</a>
          <a href="#contacts">Для бизнеса</a>
        </nav>
      </div>
    </header>

      <main>
      
        <section className="hero">
          <div className="hero-content">
            <p className="hero-label">СИБВЕНТ — ваш надёжный поставщик</p>
            <h1>Материалы и монтаж под ключ</h1>
            <p>
              Всё необходимое для систем вентиляции,
              отопления и водоснабжения.
            </p>
            <a className="hero-button" href="#catalog">
              Перейти в каталог
            </a>
          </div>
        </section>
<section className="benefits">
  <div className="benefit">
    <strong>01</strong>
    <h3>Широкий ассортимент</h3>
    <p>Материалы и оборудование для инженерных систем.</p>
  </div>

  <div className="benefit">
    <strong>02</strong>
    <h3>Поставка и доставка</h3>
    <p>Помогаем подобрать и доставить необходимые материалы.</p>
  </div>

  <div className="benefit">
    <strong>03</strong>
    <h3>Монтаж под ключ</h3>
    <p>Комплексные решения для вашего объекта.</p>
  </div>
</section>

<section className="categories">
  <p className="section-label">КАТАЛОГ</p>
  <h2>Популярные категории</h2>

    <div className="category-list">
    {categories.map((category) => (
      <div className="category-card" key={category.category_id}>
        {category.category_name}
      </div>
    ))}
  </div>

</section>
        <section className="catalog" id="catalog">
          <div className="section-heading">
            <div>
              <p className="section-label">НАШ АССОРТИМЕНТ</p>
              <h2>Популярные товары</h2>
            </div>
          </div>

        {loading ? (
          <p>Загрузка товаров...</p>
          ) : (
           <div className="products">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                
                <article className="product-card" key={product.product_id}>
                  <div className="product-image">
                    <img
                      src="https://images.unsplash.com/photo-1581092921461-eab62e97a780"
                      alt={product.product_name}
                    />
                  </div>

                  <p className="product-category">
                    Категория №{product.category_id}
                  </p>

                  <h3>{product.product_name}</h3>

                  <p className="article">
                    Артикул: {product.article}
                  </p>

                  <div className="product-bottom">
                    <strong>
                      {Number(product.price).toLocaleString('ru-RU')} ₽
                    </strong>
                    <button>В корзину</button>
                  </div>
                </article>
              ))
            ) : (
              <p>По вашему запросу товары не найдены.</p>
            )}
          </div>
          )}
        </section>

        <section className="services" id="services">
          <h2>Наши услуги</h2>
          <p>
            Помогаем подобрать оборудование и организуем
            монтаж инженерных систем.
          </p>
          <button>Нужен монтаж</button>
        </section>
      </main>

<section className="request">
  <div className="request-content">
    <p className="section-label">ЕСТЬ ВОПРОСЫ?</p>
    <h2>Нужен монтаж или помощь с подбором?</h2>
    <p>Оставьте заявку, и мы свяжемся с вами.</p>
  </div>

  <form className="request-form">
    <input type="text" placeholder="Ваше имя" />
    <input type="tel" placeholder="Номер телефона" />
    <button type="button">Отправить заявку</button>
  </form>
</section>

      <footer className="footer" id="contacts">
        <a className="logo" href="#">
          СИБ<span>ВЕНТ</span>
        </a>
        <p>Материалы и оборудование для инженерных систем</p>
        <p>© 2026 СИБВЕНТ</p>
      </footer>
    </div>
  );
}

export default App;
