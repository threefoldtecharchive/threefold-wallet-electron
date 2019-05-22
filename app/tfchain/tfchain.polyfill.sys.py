def sleep(n):
    """
    Sleep for n seconds.

    NOTE: NOT MEANT FOR PRODUCTION USAGE
    """
    ms = n * 1000
    __pragma__("js", "{}", """
    const start = new Date().getTime();
    let end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
    """)
