import { shallowMount } from '@vue/test-utils'
import Login from '@/components/Login.vue'

const sel = (id : string) => `[data-test="${id}"]`

describe('Login.vue', () => {
  it.skip('renders props.msg when passed', () => {
    const wrapper = shallowMount(Login)
  })
})
