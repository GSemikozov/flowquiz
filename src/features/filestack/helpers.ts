export const tryCatch = <TProps, TResult, TErrorResult = TResult>({
    tryer,
    catcher,
}: {
    tryer: (props: TProps) => TResult;
    catcher: (props: TProps, error: Error) => TErrorResult;
}) => (props: TProps) => {
    try {
        return tryer(props);
    } catch (e) {
        return catcher(props, e.message);
    }
};

export const getClient = () => window.filestackClient;
