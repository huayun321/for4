exports.resizeVersion = {
    materials: {
        thumbnail:{
            width:80,
            height:"80!"
        }
        // ,
        //small: {
        //    width:200,
        //    height:"150!"
        //},
        //medium:{
        //    width:400,
        //    height:300
        //},
        //large: {
        //    width: 800,
        //    height: 600
        //}
    },

    avatar: {
        thumbnail:{
            width:209,
            height:"209!"
        }
        // ,
        //small: {
        //    width:200,
        //    height:"150!"
        //},
        //medium:{
        //    width:400,
        //    height:300
        //},
        //large: {
        //    width: 800,
        //    height: 600
        //}
    },

    posts: {
        thumbnail:{
            width:210,
            height:"240^",
            imageArgs: [
                "-gravity", "center",
                "-extent", "210x240"
            ]
        }
        // ,
        //small: {
        //    width:200,
        //    height:"150!"
        //},
        //medium:{
        //    width:400,
        //    height:300
        //},
        //large: {
        //    width: 800,
        //    height: 600
        //}
    },
    rubies : {
        thumbnail:{
            width:210,
            height:"240^",
            imageArgs: [
                "-gravity", "center",
                "-extent", "210x240"
            ]
        }
        //,
        //small: {
        //    width:"200",
        //    height:"150^",
        //    imageArgs: [
        //        "-gravity", "center",
        //        "-extent", "200x150"
        //    ]
        //},
        //medium:{
        //    width:400,
        //    height:300
        //},
        //large: {
        //    width: 800,
        //    height: 600
        //}
    }
};
exports.directors = {
    temp: './tmp',
    materials: '/public/uploads/materials',
    materials_url: '/uploads/materials',
    rubies: '/public/uploads/rubies',
    rubies_url: '/uploads/rubies',
    posts: '/public/uploads/posts',
    posts_url: '/uploads/posts',
    avatar: '/public/uploads/avatar',
    avatar_url: '/uploads/avatar'
};