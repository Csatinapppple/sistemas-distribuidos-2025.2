

rode o servidor

´´´bash
mvn compile exec:java -Dexec.mainClass="server.Server"
´´´

pegue a geracao da api wsdl com o wsdl2java mas primeiro tem que pegar dos arquivos da apache
por que essa merda nao funciona normalmente

```bash
curl -L -o apache-cxf-4.0.3.tar.gz https://archive.apache.org/dist/cxf/4.0.3/apache-cxf-4.0.3.tar.gz
```

gere o codigo

```bash
./apache-cxf-4.0.3/bin/wsdl2java -d . -p client.wsdl "http://localhost:8080/calculadora?wsdl" 
```

bata punheta com o codigo
