import classes from './UserFormDesc.module.css';
import UserFormDescRow from './UserFormDescRow';

const UserFormDesc = () => {
  const descriptions = [
    {
      title: 'Start with only few steps',
      description: 'Just create your account and start buying and selling.',
    },
    {
      title: 'Buy at great deals',
      description: 'Easily find endless great deals that suit your needs.',
    },
    {
      title: 'Sell with confidence',
      description: 'Describe your items with great details.',
    },
    {
      title: 'Negotiate',
      description: "Don't like the price? You can negotiate.",
    },
  ];
  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <span>Membership Benefits:</span>
      </header>
      <main>
        {descriptions.map((row, index) => {
          return <UserFormDescRow key={index} content={row} />;
        })}
      </main>
    </div>
  );
};

export default UserFormDesc;
