import { useEffect, useState } from "react";

export const useLocalStorage = () => {
    const [isAvailable, setIsAvailable] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsAvailable(true);
        }
    }, []);

    return isAvailable;
}