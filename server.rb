require 'webrick'
mime = WEBrick::HTTPUtils::DefaultMimeTypes.merge(
  'mp4'  => 'video/mp4',
  'webm' => 'video/webm',
  'ogg'  => 'video/ogg',
  'woff2'=> 'font/woff2',
  'woff' => 'font/woff'
)
s = WEBrick::HTTPServer.new(
  Port: 3000,
  DocumentRoot: '/tmp',
  MimeTypes: mime,
  Logger: WEBrick::Log.new('/dev/null'),
  AccessLog: []
)
trap('INT') { s.shutdown }
trap('TERM') { s.shutdown }
s.start
