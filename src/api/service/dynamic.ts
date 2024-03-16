export const fetchDynamicApi = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_DYNAMIC_URL! +
        process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT! +
        '/users',
      {
        cache: 'no-cache',
        mode: 'no-cors',
        headers: {
          Authorization:
            'Bearer dyn_HcGiWTT6Z6hdzS3TfT7KDCAoqw4dkbgtz3ZJ7xdATMUMxlQ5p31LrhzJ',
        },
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
