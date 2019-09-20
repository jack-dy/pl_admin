<template>
    <div class="createPost-container">
        <el-form ref="postForm" 
        :model="postForm" 
        :rules="rules" 
        class="form-container">
            <div class="createPost-main-container">
                <el-form-item style="margin-bottom: 40px;" label-width="80px" label="产品名称:">
                    <el-input v-model="postForm.content_short" :rows="1" type="text" class="input" autosize placeholder="产品名称" />
                </el-form-item>
                <el-form-item style="margin-bottom: 40px;" label-width="80px" label="产品类型:">
                    <el-input v-model="postForm.content_short" :rows="1" type="text" class="input" autosize placeholder="产品类型" />
                </el-form-item>
                <el-form-item style="margin-bottom: 40px;" label-width="80px" label="排序:">
                    <el-input v-model="postForm.sort" :rows="1" type="textarea" class="input" autosize placeholder="排序" />
                </el-form-item>
                <el-form-item style="margin-bottom: 40px;" label-width="80px" label="产品价格:">
                    <el-input v-model="postForm.price" :rows="1" type="text" class="input" autosize placeholder="产品价格" />
                </el-form-item>
                <el-form-item style="margin-bottom: 40px;" label-width="80px" label="产品图片:">
                    <div>
                        <el-upload
                        action="#"
                        list-type="picture-card"
                        :file-list='postForm.picc'
                        :auto-upload="false">
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                            <i slot="default" class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{file}">
                            <img
                                class="el-upload-list__item-thumbnail"
                                :src="file.url" alt=""
                            >
                            <span class="el-upload-list__item-actions">
                                <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                                >
                                <i class="el-icon-zoom-in"></i>
                                </span>
                                <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleRemove(file)"
                                >
                                <i class="el-icon-delete"></i>
                                </span>
                            </span>
                            </div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </div>
                
                </el-form-item>
                <el-form-item>
                <el-button v-loading="loading" style="margin-left:10px;" type="success" @click="submitForm">确定</el-button>
                </el-form-item>
            </div>
        </el-form> 
    </div>
</template>
<script>
// import Upload from '@/components/Upload/multipleimage'
import {addorUpdate, fetchgoods} from '@/api/goods'
const defaultForm ={
    name:'',//分类名称
    category_id:undefined,
    content:'',
    pics:'',
    price:0,
    sort:100,
    picc:[]

}

export default {
    name:'goodsDetail',
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
            tempRoute: {},
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false
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
         handleRemove(file) {
        console.log(file);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleDownload(file) {
        console.log(file);
      },
        fetchData(id){
            //查询
            fetchCategory(id)
            .then(res=>{
                this.postForm = res.data.data.list;
            })
        },
        submitForm(){
            console.log(this.postForm);
        // this.$refs.postForm.validate(valid => {
        //     if (valid) {
                
        //         this.loading=true;
        //         addorUpdate(this.postForm)
        //         .then(res=>{
        //             if(res.data.code=='1'){
        //                 this.$message({
        //                     message:'成功',
        //                     type:'success'
        //                 })
        //                 this.$router.push("/category");
        //             }else{
        //                 this.$message({
        //                     message:'失败',
        //                     type:'warning'
        //                 })
        //             }
        //             this.loading=false;
        //         })

        //     }else {
        //     console.log('error submit!!')
        //     return false
        //     }
        // })
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

.input /deep/ {
  textarea {
    padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
  input {
      padding-right: 40px;
    resize: none;
    border: none;
    border-radius: 0px;
    border-bottom: 1px solid #bfcbd9;
  }
}
.el-upload-list--picture-card .el-upload-list__item-thumbnail{
    width: 148px;
    height: 148px;
}
</style>