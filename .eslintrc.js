module.exports = {
    extends: ['airbnb-base', 'prettier'],
    rules: {
        quotes: ['error', 'single'],
        'no-underscore-dangle': ['error', { allow: ['_id'] }],
        'linebreak-style': 'off',
    },
}
