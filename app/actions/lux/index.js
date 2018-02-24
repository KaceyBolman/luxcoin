// @flow
import WalletsActions from './wallets-actions';
import WalletSettingsActions from './wallet-settings-actions';

export type luxActionsMap = {
  wallets: WalletsActions,
  walletSettings: WalletSettingsActions,
};

const luxActionsMap: luxActionsMap = {
  wallets: new WalletsActions(),
  walletSettings: new WalletSettingsActions(),
};

export default luxActionsMap;
