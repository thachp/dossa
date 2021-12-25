import { gql } from "@apollo/client";

import { useQuery } from "../../../common/hooks/useApollo.hook";

export const CHECK_VPN = gql`
    query {
        hasVPN
    }
`;

const useVPNConnection = () => {
    return useQuery(CHECK_VPN, {
        onCompleted: (data) => {}
    });
};

export default useVPNConnection;
