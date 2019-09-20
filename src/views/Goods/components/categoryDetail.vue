<template>
    <div class="createPost-container">
        <el-form ref="postForm" 
        :model="postForm" 
        :rules="rules" 
        class="form-container">
            <div class="createPost-main-container">
                <el-row>
                    <el-col :span="24">
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label-width="80px" label="分类名:" prop="name">
                                    <el-input v-model="postForm.name"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label-width="80px" label="排序:" prop="sort">
                                    <el-input v-model="postForm.sort"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-button v-loading="loading" style="margin-left:10px;" type="success" @click="submitForm">确定</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-form>
        
    </div>
</template>
<script>
import {addorUpdate, fetchCategory} from '@/api/category'
const defaultForm ={
    name:'',//分类名称
    category_id:undefined,
    sort:'100',//排序

}

export default {
    name:'categoryDetail',
    components:{},
    props:{
        isEdit:Boolean,
        default:false
    },
    data(){
        return{
            postForm: Object.assign({}, defaultForm),
            loading:false,
            rules:{
                name:[{ required: true, message: '分类名称', trigger: 'blur' },],
                sort:[
                    { required: true, message: '排序', trigger: 'blur' },
                    //{type: 'number', message:'排序必须是数字',trigger: 'blur'}
                ],
            },
            tempRoute: {}
        }
    },
    created(){
        if(this.isEdit){
            const id = this.$route.params && this.$route.params.id
            this.fetchData(id)
        }else{
            this.postForm = Object.assign({}, defaultForm)
        }
    },
    methods:{
        fetchData(id){
            //查询
            fetchCategory(id)
            .then(res=>{
                this.postForm = res.data.data.list;
            })
        },
        submitForm(){
        this.$refs.postForm.validate(valid => {
            if (valid) {
                this.loading=true;
                addorUpdate(this.postForm)
                .then(res=>{
                    if(res.data.code=='1'){
                        this.$message({
                            message:'成功',
                            type:'success'
                        })
                        this.$router.push("/category");
                    }else{
                        this.$message({
                            message:'失败',
                            type:'warning'
                        })
                    }
                    this.loading=false;
                })

            }else {
            console.log('error submit!!')
            return false
            }
        })
        }
    },
    
}
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";

.createPost-container {
  position: relative;

  .createPost-main-container {
    padding: 40px 45px 20px 50px;
    background:#fff;
    .postInfo-container {
      position: relative;
      @include clearfix;
      margin-bottom: 10px;
      padding-top: 20px;
      .postInfo-container-item {
        float: left;
      }
    }
  }

  .word-counter {
    width: 40px;
    position: absolute;
    right: 10px;
    top: 0px;
  }
}

.article-textarea /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
</style>