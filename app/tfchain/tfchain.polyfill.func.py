import tfchain.polyfill.encoding.object as jsobj

def opts_get(opts, *argv):
    argv_dict = dict([(arg, None) for arg in argv])
    return opts_get_with_defaults(opts, argv_dict)

def opts_get_with_defaults(opts, argv):
    args = []
    if opts == None:
        opts = {}
    for arg, default in jsobj.get_items(argv):
        args.append(opts[arg] if arg in opts else default)
    if len(args) == 0:
        return None
    if len(args) == 1:
        return args[0]
    return args
