import * as raneto from 'raneto';
import config from './config';

const app = raneto(config);

app.listen(
    config.server_port,
    () => console.log(config.site_title, `running on http://localhost:${config.server_port}...`)
);
