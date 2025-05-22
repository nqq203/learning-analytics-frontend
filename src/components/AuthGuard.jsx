import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { refresh } from '@/redux/thunk/authThunk';

const PUBLIC_PATHS = ['/login', '/register'];

export default function AuthGuard({ children }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { pathname, isReady } = router;

    const { accessToken, loading } = useSelector(state => state.auth);
    const [tried, setTried] = useState(false);

    // 1) On first mount (when router.isReady), attempt refresh if needed
    useEffect(() => {
        if (!isReady || tried) return;

        // public pages don't need a token
        if (PUBLIC_PATHS.includes(pathname)) {
            setTried(true);
            return;
        }

        // if we already have a token, skip refresh
        if (accessToken) {
            setTried(true);
            return;
        }

        // otherwise try to refresh via cookie
        dispatch(refresh())
            .finally(() => setTried(true));
    }, [isReady, pathname, accessToken, tried, dispatch]);

    // 2) After we've “tried” (and loading done), redirect if still no token on a protected page
    useEffect(() => {
        if (!tried || loading) return;
        if (!accessToken && !PUBLIC_PATHS.includes(pathname)) {
            router.replace('/login');
        }
    }, [tried, loading, accessToken, pathname, router]);

    // 3) While waiting on refresh or redirect, render nothing
    if (!isReady || !tried || loading) {
        return null;
    }

    // 4) Allow public pages through
    if (PUBLIC_PATHS.includes(pathname)) {
        return <>{children}</>;
    }

    // 5) If we have a token, render the protected content
    if (accessToken) {
        return <>{children}</>;
    }

    // (Shouldn't ever reach here, but just in case)
    return null;
}
