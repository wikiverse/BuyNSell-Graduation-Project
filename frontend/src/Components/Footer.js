import classes from './Footer.module.css';

const Footer = () => {
  return (
    <div className={classes.container}>
      <div>
        <span>
          Buy&#38;Sell by{' '}
          <a
            className={classes.link}
            target="_blank"
            href="https://github.com/wikiverse"
            rel="noreferrer"
          >
            Damdinbazar
          </a>
        </span>
      </div>
      <span className={classes.separate}>|</span>
      <div>
        <a
          className={classes.link}
          target="_blank"
          href="https://github.com/wikiverse/BuyNSell-Graduation-Project"
          rel="noreferrer"
        >
          <span>Made in Open-Source</span>
          <i style={{ margin: '0 5px' }} className="bi bi-github"></i>
        </a>
      </div>
    </div>
  );
};

export default Footer;
