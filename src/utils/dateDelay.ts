const dateDelay = (unixTime: number) => (Date.now() < unixTime ? true : false);

export default dateDelay;
