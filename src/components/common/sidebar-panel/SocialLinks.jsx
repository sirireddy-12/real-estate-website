const SocialLinks = () => {
  const socialLinks = [
    { id: 1, iconClass: "fab fa-facebook-f", label: "Facebook" },
    { id: 2, iconClass: "fab fa-twitter", label: "Twitter" },
    { id: 3, iconClass: "fab fa-instagram", label: "Instagram" },
    { id: 4, iconClass: "fab fa-linkedin-in", label: "LinkedIn" },
  ];

  return (
    <>
      {socialLinks.map((link) => (
        <a className="me-3" href="/" aria-label={link.label} key={link.id}>
          <i className={link.iconClass}></i>
        </a>
      ))}
    </>
  );
};

export default SocialLinks;
