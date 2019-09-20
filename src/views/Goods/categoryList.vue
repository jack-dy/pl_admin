<template>
    <div class="category-list">
        <div class="add_btn">
            <router-link :to="'/categoryadd'"><el-button type="primary" size="small">新增</el-button></router-link>
        </div>
        
        
        <el-table :data="tableData" class="table-box" :height="tHeight">
          <el-table-column align="center" label="分类ID" width="100" >
              <template slot-scope="{row}">
                  <span>{{row.category_id}}</span>
              </template>
          </el-table-column>
          <el-table-column align="center" label="分类名称" width="220">
              <template slot-scope="{row}">
                  <span>{{row.name}}</span>
              </template>
          </el-table-column>
          <el-table-column align="center" label="分类排序" width="80">
              <template slot-scope="{row}">
                  <span>{{row.sort}}</span>
              </template>
          </el-table-column>
          <el-table-column align="center" label="添加时间" >
              <template slot-scope="{row}">
                  <span>{{row.time}}</span>
              </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="160">
              <template slot-scope="scope">
                  <router-link :to="'/categoryedit/'+scope.row.category_id">
                    <el-button 
                    type="primary"
                    size="small">编辑</el-button>
                  </router-link>
              </template>
          </el-table-column>
      
      </el-table>
    </div>
</template>
<script>
import {fetchList} from '@/api/category'
export default {
    'name':'categoryList',
    data(){
        return{
            tHeight:(document.body.offsetHeight - 270),
            tableData:[],
            page:1,
            size:5,
            total:0,
            dialogVisible:false
        }
    },
    methods:{
        async loadList(){
            let listQuery={
                'page':this.page,
                'limit':this.size
            }
            const res = await fetchList(listQuery)
            const lists = res.data.data.list;
            const total = res.data.data.total;
            this.tableData = lists.map(v=>{
                v.time = this.formatDate(v.create_time);
                return v;
            })

            
        },
        confirmEdit(row){
           row.originalName=row.name
            row.edit=false 
            updatename(row)
        },
        formatDate(datetime) {
            var date = new Date(parseInt(datetime+'000'));

            // var date = new Date(datetime);
            var year = date.getFullYear(),
            month = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1):date.getMonth() + 1,
            day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
            hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
            min = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
            sec = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return year + '-' + month + '-' + day ;//+ ' ' + hour + ':' + min + ':' + sec;
}
    },
    created(){
        this.loadList();
    }
}
</script>
<style lang="scss" scoped>
.add_btn{
    margin: 10px;
}
.table-data {
  height: 100%;
  .table-box {
    font-size: 14px;
  }
  .pages {
    background: #fff;
    margin-top: 10px;
    padding: 10px 10px;
    text-align: right;
    height: 55px;
    box-sizing: border-box;
  }
  .search-box {
    background: #fff;
    margin-bottom: 10px;
    padding: 10px 10px;
    border-radius: 4px;
    height: 55px;
    box-sizing: border-box;
    .el-input {
      width: 200px;
      margin-right: 10px;
    }
  }
}
</style>
