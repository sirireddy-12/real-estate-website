const Social = () => {
  const socialIcons = [
    { icon: "fab fa-facebook-f", label: "Facebook" },
    { icon: "fab fa-twitter", label: "Twitter" },
    { icon: "fab fa-instagram", label: "Instagram" },
    { icon: "fab fa-linkedin-in", label: "LinkedIn" },
  ];

  return (
    <div className="social-style1">
      {socialIcons.map((item) => (
        <a key={item.label} href="/" aria-label={item.label}>
          <i className={item.icon + " list-inline-item"} />
        </a>
      ))}
    </div>
  );
};

export default Social;
