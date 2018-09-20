import { NetInfo } from 'react-native';

function getNetworkAvailablity(responseCallback) {
    Promise.resolve(
        NetInfo.getConnectionInfo()
    ).then(connectionInfo => {
        if(connectionInfo.type === 'none' ) {
            return responseCallback(false);
        }
        return responseCallback(true);
    });
}

exports.getNetworkAvailablity = getNetworkAvailablity;