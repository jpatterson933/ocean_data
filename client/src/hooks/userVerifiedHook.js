import { useQuery } from "@apollo/client";
import { IS_USER_VERIFIED } from "../utils/queries";
import{useEffect} from "react";

export default function userVerifiedHook() {
    const {data, loading, error, startPolling, stopPolling} = useQuery(IS_USER_VERIFIED)

    useEffect(() => {
        startPolling(5000);

        return () => {
            stopPolling();
        }
    }, [startPolling, stopPolling])
    return {isVerified: data?.isUserVerified, loading, error}
};