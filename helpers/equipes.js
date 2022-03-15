const path = require("path")
const fs = require("fs")
const MarkdownIt = require('markdown-it')

module.exports = function() {
    let folder = path.join(process.cwd(), "views", "teams")
    let teams = []

    md = new MarkdownIt()
    fs.readdirSync(folder).forEach(file => {
        let content = fs.readFileSync(
                            path.join(folder, file), 
                            {encoding:'utf8', flag:'r'}
                        )
        teams.push({content: md.render(content)});
        
    });

    return teams
}