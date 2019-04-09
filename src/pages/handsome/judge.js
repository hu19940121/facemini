function judgeGender(text) {  
  return text === 'female' ? '美女' : '帅哥'
}
function judgeFaceShape(text) {
  switch (text) {
    case 'square':
      return '正方形'
    case 'triangle':
      return '三角形'
    case 'oval':
      return '椭圆'
    case 'heart':
      return '心形'
      case 'round':
      return '圆形'
    default:
      break;
    }
}
function judgeExpression(text) {
  switch (text) {
    case 'none':
      return '不笑'
    case 'smile':
      return '微笑'
    case 'laugh':
      return '大笑'
    default:
      break;
    }
}
export {
  judgeGender,
  judgeFaceShape,
  judgeExpression
}