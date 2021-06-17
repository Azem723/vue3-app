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
    <div class="wrapper__input">
      <input
        class="wrapper__input__content"
        placeholder="确认密码"
        type="password"
        v-model="ensurement"
      />
    </div>
    <div class="wrapper__register-button" @click="handleRegister">注册</div>
    <div class="wrapper__register-link" @click="handleHasAccount">
      已有账号去登录
    </div>
    <Toast v-if="show" :message="toastMessage" />
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { post } from '../../utils/request';
import Toast, { useToastEffect } from '../../components/Toast';

const useRegisterEffect = (showToast) => {
  const router = useRouter();
  const data = reactive({
    username: '',
    password: '',
    ensurement: ''
  });
  const handleRegister = async () => {
    try {
      const { username, password, ensurement } = data;
      if (!username || !password) {
        showToast('用户名和密码不能为空');
        return;
      } else if (password !== ensurement) {
        showToast('两次输入的密码不一致');
        return;
      }
      const result = await post('/api/user/register', {
        username: username,
        password: password
      });
      if (result?.errno === 0) {
        localStorage.isLogin = true;
        router.push({ name: 'Home' });
      } else {
        showToast('注册失败');
      }
    } catch (e) {
      showToast('请求失败');
    }
  };
  const { username, password, ensurement } = toRefs(data);
  return { handleRegister, username, password, ensurement };
};

const useHasAccountEffect = () => {
  const router = useRouter();
  const handleHasAccount = () => {
    router.push({ name: 'Login' });
  };
  return { handleHasAccount };
};

export default {
  name: 'Register',
  components: { Toast },
  setup() {
    const { show, toastMessage, showToast } = useToastEffect();
    const {
      handleRegister,
      username,
      password,
      ensurement
    } = useRegisterEffect(showToast);
    const { handleHasAccount } = useHasAccountEffect();
    return {
      show,
      toastMessage,
      handleRegister,
      username,
      password,
      ensurement,
      handleHasAccount
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
      line-height: 0.48rem;
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
  &__register-button {
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
  &__register-link {
    text-align: center;
    font-size: 0.14rem;
    color: $content-notice-fontcolor;
    letter-spacing: 0;
    margin-top: 0.16rem;
  }
}
</style>
