const setCookie = (name: string, value: string, expiresAt: Date) => {
  let domain = process.env.NEXT_PUBLIC_MAIN_DOMAIN;

  if (domain !== "localhost") domain = "." + domain;

  let cookie = `${name}=${value};domain=${domain};path=/;expires=${expiresAt.toUTCString()}`;
  if (domain !== "localhost") cookie += `;secure`;
  cookie += ";";

  document.cookie = cookie;
};

export default setCookie;
