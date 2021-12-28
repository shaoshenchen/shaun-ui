function useAssert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assert Error: ${msg}`)
  }
}

export default useAssert