def debug(*argv):
    l = None
    __pragma__("js", "{}", """
    l = console.debug;
    """)
    l(*argv)

def info(*argv):
    l = None
    __pragma__("js", "{}", """
    l = console.info;
    """)
    l(*argv)

def warning(*argv):
    l = None
    __pragma__("js", "{}", """
    l = console.warn;
    """)
    l(*argv)

def error(*argv):
    l = None
    __pragma__("js", "{}", """
    l = console.error;
    """)
    l(*argv)
