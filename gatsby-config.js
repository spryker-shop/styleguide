module.exports = {
    siteMetadata: {
        title: 'Spryker Styleguide',
        meta: [
            { name: 'description', content: 'Spryker Styleguide' },
            { name: 'keywords', content: 'spryker, styleguide, spryker-shop' }
        ]
    },

    plugins: [
        'gatsby-plugin-react-helmet',
        'gatsby-transformer-sharp',
        'gatsby-plugin-sharp',
        'gatsby-plugin-sass',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'gatsby-starter-default',
                short_name: 'starter',
                start_url: '/',
                background_color: '#663399',
                theme_color: '#663399',
                display: 'minimal-ui',
                icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
            }
        },
        {
            resolve: "gatsby-plugin-react-svg",
            options: {
                rule: {
                    include: /icons/
                }
            }
        },
        {
            resolve: 'gatsby-source-spryker-shop',
            options: {
                // Spryker project path, it can be absolute or relative
                projectPath: '../suite-nonsplit/project',

                // number, limits the collector to [n] elements per target
                only: null,

                // enable debug mode
                debugMode: false
            }
        }
    ]
}
