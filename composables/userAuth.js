export default function () {
  let user = useState('user', () => localStorage.getItem('user'))

  return { user }
}
