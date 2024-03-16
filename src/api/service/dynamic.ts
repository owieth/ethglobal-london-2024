const getWalletByPhone = async (phone: string) => {
  try {
    const response = await fetch(
      process.env.DYNAMIC_URL! + process.env.DYNAMIC_ENVIRONMENT! + `/users`,
      {
        cache: 'no-store',
      }
    );
    if (!response.ok) {
      console.log('Failed to fetch Wallet');
    }
    return response.json();
  } catch (err) {
    console.log('Error loading Wallet: ', err);
  }
};
