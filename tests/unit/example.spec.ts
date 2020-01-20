import { shallowMount } from '@vue/test-utils'
import Login from '@/components/Login.vue'

const sel = (id : string) => `[data-test="${id}"]`

describe('Login.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(Login, {
      propsData: { msg }
    })

    expect(wrapper.find(sel('message')).text()).toMatch(msg)
  })
})
