require 'juicer'

ROOT = File.dirname( File.expand_path( __FILE__ ) ) unless defined? ROOT

desc "Compile"
task :default => :prod do
end

desc "Compile production"
task :prod do
  compile('production')
end

desc "Compile development"
task :dev do
  compile('development')
end

def compile(env)
  files = ["#{ROOT}/js/main.js"]
  opts = {}
  merger = Juicer::Merger::JavaScriptMerger.new(files, opts)
  if env == 'production'
    opts = {}
    opts[:bin_path] = File.join(Juicer.home, "lib", "yui_compressor", "bin")
    merger.set_next(Juicer::Minifyer::YuiCompressor.new(opts))
  end
  merger.save("#{ROOT}/js/main.min.js")
end
