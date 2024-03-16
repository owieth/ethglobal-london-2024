export const cssOverrides = `
  .balance-container,
  .active-wallet-information__address,
  .dynamic-widget-wallet-header__wallet-info,
  .active-wallet-information__network-picker {
    display: none
  }

  .wallet-list-item__tile:hover > img {
    animation: rotate 1s forwards;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
