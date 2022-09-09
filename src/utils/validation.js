class Validation {
  constructor(assertion, rule, errMsg) {
    this.assertion = assertion
    this.rule = rule
    this.errMsg = errMsg
  }
  check(text) {
    return this.rule(text)
  }
  errMsg() {
    return this.errMsg
  }
}

export const validateInputExistence = (name) => new Validation(
    'input should have value',
    text => /\S/.test(text),
    `Vui lòng nhập ${name} của bạn!`
)
export const validateEmail = new Validation(
  'input should be an email',
  text => !!text?.match(/[\w-]+@([\w-]+\.)+[\w-]+/i),
  'Email của bạn không đúng định dạng!'
)
export const validateLength = (min_len, max_len) => {
  const regex = new RegExp(`(?=.{${min_len},${max_len}})`, 'g')
  return new Validation(
    'input should within certain length',
    text => !!text?.match(regex),
    `Mật khẩu phải lớn hơn 6 và nhỏ hơn 15 ký tự`
  )
}

export const validate = (validations, val) => {
  if (validations) {
    for (const validation of validations) {
      if (!validation.check(val)) {
        return {
          isValid: false,
          errorMsg: validation.errMsg
        }
      }
    }
  }
  return { isValid: true }
}
