const isEmpty = (input) => {
  return (
    input === undefined || 
    input === null || 
    (typeof input === 'string' && input.trim().length === 0) || 
    (typeof input === 'object' && Object.keys(input).length === 0)
  )
};

export default isEmpty;