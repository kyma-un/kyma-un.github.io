require 'fileutils'
require 'open3'

module OptimizeImages
  def self.find_cmd
    %w[magick convert].each do |c|
      begin
        out, status = Open3.capture2e(c, '-version')
        return c if status.success? && out.include?('ImageMagick')
      rescue Errno::ENOENT
        next
      end
    end
    nil
  end
end

Jekyll::Hooks.register :site, :after_init do |site|
  cmd = OptimizeImages.find_cmd

  if cmd.nil?
    Jekyll.logger.error 'optimize_images:', 'No se encontró ImageMagick. Instálalo para generar los .jpg.'
    next
  end

  Jekyll.logger.info 'optimize_images:', "usando '#{cmd}'"

  Dir.glob(File.join(site.source, 'img', '*')).each do |dir|
    next unless File.directory?(dir)
    next if File.basename(dir) == 'web'

    out = File.join(dir, 'web')

    Dir.glob(File.join(dir, '*.*')).each do |src|
      next unless %w[.png .jpg .jpeg].include?(File.extname(src).downcase)

      base = File.basename(src, '.*')
      dest = File.join(out, "#{base}.jpg")

      next if File.exist?(dest) && File.mtime(dest) >= File.mtime(src)

      FileUtils.mkdir_p(out)

      output, status = Open3.capture2e(cmd, "#{src}[0]", '-background', 'white',
                                       '-flatten', '-quality', '95', dest)
      if status.success?
        Jekyll.logger.info 'Convertida:', "#{base}.jpg"
      else
        Jekyll.logger.warn 'Falló:', "#{File.basename(src)} -> #{output.strip}"
      end
    end
  end
end