## Tfchain client

This client is written in python and then transcripted to javascript to be used in the browser.

For the conversion of python to javascript we use: [https://www.transcrypt.org/](https://www.transcrypt.org/)

This api covers:

- wallet balances
- transactions
- multsig features
- custom transaction scripting
- ..

## Transcrypting

```
rm -rf ./app/tfchain && mkdir ./app/tfchain && python3 -m transcrypt -k -b -n -m ./src/api.py && find ./src/__target__ -name '*.js' | xargs -I '{}' ex -c ':1d' -c ':wq' {} && find ./src/__target__ | grep -E './src/__target__/.*\\.(js|py|map)$' | xargs -I '{}' mv {} ./app/tfchain && rm -rf ./src/__target__ && yarn build-tests-py
```

this removes the contents of `app/tfchain` directory and transcrypts to source code into `app/tfchain`.

or `yarn build-py` in the root of this repository.
