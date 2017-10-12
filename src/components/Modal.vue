<template>
    <div>
        <div class="md-modal modal-msg md-modal-transition md-show" v-show="mdShow">
            <div class="md-modal-inner">
                <div class="md-top">
                    <div class="md-title">Login in</div>
                    <button class="md-close" @click="close">Close</button>
                </div>
                <div class="md-content">
                    <div class="confirm-tips">
                        <slot name="message"></slot>
                        <!-- <div class="error-wrap">
                            <span class="error error-show" v-if="errorTip">用户名或者密码错误</span>
                        </div>
                        <ul>
                            <li class="regi_form_input">
                                <i class="icon IconPeople"></i>
                                <input type="text" tabindex="1" name="loginname" v-model="userName" class="regi_login_input regi_login_input_left" placeholder="User Name" data-type="loginname">
                            </li>
                            <li class="regi_form_input noMargin">
                                <i class="icon IconPwd"></i>
                                <input type="password" tabindex="2" name="password" v-model="userPwd" class="regi_login_input regi_login_input_left login-input-no input_text" placeholder="Password">
                            </li>
                        </ul> -->
                    </div>
                     <div class="btn-wrap">
                        <slot name="btnGroup"></slot>
                        <!-- <a href="javascript:;" class="btn-login" @click="login">登 录</a> -->
                    </div> 
                </div>
            </div>
        </div>
        <div class="md-overlay" v-if="mdShow" @click="close"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            loginModalFlag: true
        }
    },
    props: [
        'mdShow'
    ],
    methods: {
        close() {
            this.$emit('close')
        }
    }
}
</script>
