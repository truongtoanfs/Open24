function withOpacity(variableName) {
    return ({opacityValue}) => {
        if(opacityValue !== undefined) {
            return `rgba(var(${variableName}), ${opacityValue})`;
        }
        return `rgba(var(${variableName}))`;
    }
}

module.exports = {
    purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
        fontSize: {
            'xxs': '11px',
        },
        screens: {
            'xs': '478px',
        },
        textColor: {
            open24: {
                accent: 'var(--color-text-accent)',
                base: 'var(--color-text-base)',
                main: withOpacity('--color-main'),
            }
        },
        backgroundColor: {
            open24: {
                main: withOpacity('--color-main'),
                base: 'var(--color-base)',
            }
        },
        borderColor: {
            open24: {
                main: withOpacity('--color-main'),
            }
        },
        backgroundImage: theme => ({
            'open24-main-gradient': 'var(--color-main-gradient)',
        }),
        outline: {
            highlight: '5px solid rgba(0, 0, 0, 0.28)',
        },
        boxShadow: {
            separate: '0px 0px 6px 0 rgba(0, 0, 0, 0.2)',
        },
        spacing: {
            '150': '37.5rem',
        }
        },
    },
    variants: {
        extend: {
        display: ['group-hover', 'group-focus'],
        visibility: ['group-hover'],
        outline: ['hover'],
        borderWidth: ['last'],
        backgroundColor: ['active'],
        backgroundImage: ['hover'],
        },
    },
    plugins: [],
}
