// using breakpoint in tailwind https://tailwindcss.com/docs/responsive-design

export function isPrefix(breakpoint) {
    const screenWidth = screen.width;
    const prefix = {
        "sm": 640,
        "md": 768,
        "lg": 1024,
        "xl": 1280,
        "2xl": 1536,
    }
    const checkValue = prefix[breakpoint];

    return screenWidth > checkValue ? true : false;
}

