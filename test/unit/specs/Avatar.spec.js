import Vue from 'vue'
import Avatar from 'src/Avatar'

describe('Avatar.vue', () => {

  it('should divide name in parts on both space and hyphen', () => {
    expect(Avatar.methods.initial('Hubert Felix')).to.equal('HF')
    expect(Avatar.methods.initial('Hubert-Felix')).to.equal('HF')
    expect(Avatar.methods.initial('Hubert-Felix Thiefaine')).to.equal('HFT')
  })

  it('should use only the first letter of each name parts (up to three)', () => {
    expect(Avatar.methods.initial('Hubert-Felix De La Rochefoucault')).to.equal('HFD')
  })

  it('should use only the uppercase letter (up to three) if the name has more than three parts', () => {
    expect(Avatar.methods.initial('Hubert de la Rochefoucault')).to.equal('HR')
    expect(Avatar.methods.initial('Hubert-Felix de la Rochefoucault')).to.equal('HFR')
  })

  it('should use lowercase letter (up to three) if the name has no uppercase', () => {
    expect(Avatar.methods.initial('hubert de rochefoucault')).to.equal('HDR')
    expect(Avatar.methods.initial('hubert-felix de la rochefoucault')).to.equal('HFD')
  })

  it('should use both uppercase and lowercase letter if name has three parts or less', () => {
    expect(Avatar.methods.initial('Hubert de Rochefoucault')).to.equal('HDR')
  })

  it('should render initials if no \'src\' is given', () => {
    const username = 'Hubert-Félix'

    const vm = new Vue({
      template: '<div><avatar username="'+username+'"></avatar></div>',
      components: { Avatar }
    }).$mount()

    const initial = vm.$children[0].initial(username);
    expect(initial).to.equal('HF')
    expect(vm.$el.querySelector('#avatar > span').textContent).to.contain(initial)
  })

  it('should render an image with the correct \'src\' when given', () => {
    const username = 'Hubert-Félix'

    const vm = new Vue({
      template: '<div><avatar username="'+username+'" src="path/to/img"></avatar></div>',
      components: { Avatar }
    }).$mount()

    const initial = vm.$children[0].initial(username);
    expect(initial).to.equal('HF')

    expect(vm.$el.querySelector('#avatar > span')).to.be.null
    let av = vm.$el.querySelector('#avatar')
    let background = av.style.background// window.getComputedStyle(av,null).width
    expect(background).to.contain('path/to/img')
  })
})
