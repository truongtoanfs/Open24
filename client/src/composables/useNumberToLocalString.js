//convert số từ dạng 10000 sang dạng 10,000
export default function useNumberLocal(number) {
    return new Number(number).toLocaleString("en-US");
}

