<template>
  <div class="wrapper">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      class="wrapper__img"
    />
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入手机号"
        v-model="username"
      />
    </div>
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="请输入密码"
        type="password"
        v-model="password"
      />
    </div>
    <div class="wrapper__login-button" @click="handleLogin">登录</div>
    <div class="wrapper__login-link">
      <span class="wrapper__login-link__signUp" @click="clickRegister"
        >立即注册</span
      >
      <span class="wrapper__login-link__line">|</span>
      <span>忘记密码</span>
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { post } from '../../utils/request';
import Toast, { useToastEffect } from '../../components/Toast';

const useLoginEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({
    username: '',
    password: ''
  });
  const handleLogin = async () => {
    try {
      const { username, password } = data;
      if (!username || !password) {
        showToast('用户名和密码不能为空');
        return;
      }
      const result = await post('api/user/login', {
        username: data.username,
        password: data.password
      });
      if (result?.errno === 0) {
        localStorage.isLogin = true;
        router.push({ name: 'Home' });
      } else {
        showToast('登录失败');
      }
    } catch (e) {
      showToast('请求失败');
    }

    // axios.post().then(() => {
    //   localStorage.isLogin = true;
    //   router.push({ name: 'Home' });
    // })
    // .catch(() => {
    //   alert('登录失败');
    // });
  };

  const { username, password } = toRefs(data);
  return { username, password, handleLogin };
};

const clickRegisterEffect = () => {
  const router = useRouter();
  const clickRegister = () => {
    router.push({ name: 'Register' });
  };
  return { clickRegister };
};

export default {
  name: 'Login',
  components: { Toast },
  // 职责就是告诉你，代码执行的一个流程
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();
    const { username, password, handleLogin } = useLoginEffect(showToast);
    const { clickRegister } = clickRegisterEffect();

    return {
      handleLogin,
      clickRegister,
      username,
      password,
      show,
      toastMessage
    };
  }
};
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
.wrapper {
  position: absolute; // BFC
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  &__img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  &__input {
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    padding: 0 0.16rem;
    background: #f9f9f9;
    border: 0.01rem solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    border-radius: 0.06rem;
    &__content {
      margin-top: .12rem;
      line-height: 0.22rem;
      border: none;
      outline: none;
      width: 100%;
      background: none;
      font-size: 0.16rem;
      color: $content-notice-fontcolor;
      &::placeholder {
        color: $content-notice-fontcolor;
        font-family: PingFangSC-Regular;
      }
    }
  }
  &__login-button {
    margin: 0.32rem 0.4rem 0 0.4rem; // margin重叠,wrapper是BFC
    line-height: 0.48rem;
    background: $btn-bgColor;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    border-radius: 0.04rem;
    border-radius: 0.04rem;
    color: $bgColor;
    font-size: 0.16rem;
    text-align: center;
  }
  &__login-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
    letter-spacing: 0;
    margin-top: 0.16rem;
    &__line {
      margin: 0 0.12rem 0 0.12rem;
    }
  }
}
</style>
