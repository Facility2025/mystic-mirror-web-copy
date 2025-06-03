
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Upload, Download, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BudgetModal = ({ isOpen, onClose }: BudgetModalProps) => {
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    projectName: '',
    budgetDate: '',
    deliveryDate: '',
    projectValue: '',
    projectCost: '',
    projectImage: null as File | null,
    responsible: '',
    paymentForm: 'ate-2000',
    entryValue: '',
    monthlyValue: '',
    months: '',
    remainingValue: '',
    description: '',
    emailRecipient: ''
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, projectImage: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = async () => {
    try {
      const pdf = new jsPDF();
      
      // Título
      pdf.setFontSize(20);
      pdf.text('Orçamento - WXsoftware', 20, 30);
      
      // Dados do projeto
      pdf.setFontSize(12);
      let yPosition = 50;
      
      pdf.text(`Nome do Projeto: ${formData.projectName}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Data do Orçamento: ${formData.budgetDate}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Data de Entrega Prevista: ${formData.deliveryDate}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Valor do Projeto: R$ ${formData.projectValue}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Custo do Projeto: R$ ${formData.projectCost}`, 20, yPosition);
      yPosition += 10;
      pdf.text(`Responsável: ${formData.responsible}`, 20, yPosition);
      yPosition += 10;
      
      // Forma de pagamento
      if (formData.paymentForm === 'ate-2000') {
        pdf.text('Forma de Pagamento: 50% entrada + 50% na entrega', 20, yPosition);
        yPosition += 10;
        pdf.text(`Entrada: R$ ${formData.entryValue}`, 20, yPosition);
        yPosition += 10;
        pdf.text(`Na entrega: R$ ${formData.remainingValue}`, 20, yPosition);
      } else {
        pdf.text('Forma de Pagamento: Entrada + Parcelamento', 20, yPosition);
        yPosition += 10;
        pdf.text(`Entrada: R$ ${formData.entryValue}`, 20, yPosition);
        yPosition += 10;
        pdf.text(`Parcelas mensais: R$ ${formData.monthlyValue} por ${formData.months} meses`, 20, yPosition);
      }
      
      yPosition += 20;
      pdf.text('Descrição:', 20, yPosition);
      yPosition += 10;
      
      // Quebrar descrição em linhas
      const lines = pdf.splitTextToSize(formData.description, 170);
      pdf.text(lines, 20, yPosition);
      
      // Salvar PDF
      const fileName = `Orcamento_${formData.projectName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);
      
      toast({
        title: "PDF gerado com sucesso!",
        description: `Arquivo ${fileName} foi baixado.`,
      });
    } catch (error) {
      toast({
        title: "Erro ao gerar PDF",
        description: "Ocorreu um erro ao gerar o arquivo PDF.",
        variant: "destructive",
      });
    }
  };

  const saveToFolder = () => {
    try {
      // Simular salvamento em pasta (em uma aplicação real, isso seria feito no backend)
      const folderName = `01_${formData.projectName}`;
      const budgetData = {
        ...formData,
        createdAt: new Date().toISOString(),
        folderId: '01'
      };
      
      // Salvar no localStorage para demonstração
      const existingBudgets = JSON.parse(localStorage.getItem('wxsoftware_budgets') || '[]');
      existingBudgets.push(budgetData);
      localStorage.setItem('wxsoftware_budgets', JSON.stringify(existingBudgets));
      
      toast({
        title: "Orçamento salvo!",
        description: `Salvo na pasta: ${folderName}`,
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o orçamento.",
        variant: "destructive",
      });
    }
  };

  const sendEmail = () => {
    try {
      // Simular envio de email (em uma aplicação real, isso seria feito no backend)
      const emailContent = `
        Orçamento - WXsoftware
        
        Nome do Projeto: ${formData.projectName}
        Data do Orçamento: ${formData.budgetDate}
        Data de Entrega: ${formData.deliveryDate}
        Valor: R$ ${formData.projectValue}
        Responsável: ${formData.responsible}
        
        Descrição: ${formData.description}
      `;
      
      console.log('Enviando email para:', formData.emailRecipient);
      console.log('Conteúdo:', emailContent);
      
      toast({
        title: "Email enviado!",
        description: `Orçamento enviado para ${formData.emailRecipient}`,
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar email",
        description: "Ocorreu um erro ao enviar o email.",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      projectName: '',
      budgetDate: '',
      deliveryDate: '',
      projectValue: '',
      projectCost: '',
      projectImage: null,
      responsible: '',
      paymentForm: 'ate-2000',
      entryValue: '',
      monthlyValue: '',
      months: '',
      remainingValue: '',
      description: '',
      emailRecipient: ''
    });
    setImagePreview(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-blue border-neon-green/30">
        <DialogHeader>
          <DialogTitle className="text-neon-green text-xl font-bold">
            Orçamento - Sistema WXsoftware
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
          {/* Coluna esquerda */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectName" className="text-white">Nome do Projeto</Label>
              <Input
                id="projectName"
                value={formData.projectName}
                onChange={(e) => handleInputChange('projectName', e.target.value)}
                className="bg-darker-blue border-neon-green/30 text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="budgetDate" className="text-white">Data do Orçamento</Label>
                <Input
                  id="budgetDate"
                  type="date"
                  value={formData.budgetDate}
                  onChange={(e) => handleInputChange('budgetDate', e.target.value)}
                  className="bg-darker-blue border-neon-green/30 text-white"
                />
              </div>
              <div>
                <Label htmlFor="deliveryDate" className="text-white">Data de Entrega</Label>
                <Input
                  id="deliveryDate"
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
                  className="bg-darker-blue border-neon-green/30 text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectValue" className="text-white">Valor do Projeto (R$)</Label>
                <Input
                  id="projectValue"
                  type="number"
                  value={formData.projectValue}
                  onChange={(e) => handleInputChange('projectValue', e.target.value)}
                  className="bg-darker-blue border-neon-green/30 text-white"
                />
              </div>
              <div>
                <Label htmlFor="projectCost" className="text-white">Custo do Projeto (R$)</Label>
                <Input
                  id="projectCost"
                  type="number"
                  value={formData.projectCost}
                  onChange={(e) => handleInputChange('projectCost', e.target.value)}
                  className="bg-darker-blue border-neon-green/30 text-white"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="responsible" className="text-white">Responsável pelo Projeto</Label>
              <Input
                id="responsible"
                value={formData.responsible}
                onChange={(e) => handleInputChange('responsible', e.target.value)}
                className="bg-darker-blue border-neon-green/30 text-white"
              />
            </div>

            <div>
              <Label className="text-white">Imagem do Projeto</Label>
              <div className="mt-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="flex items-center justify-center w-full h-32 border-2 border-dashed border-neon-green/30 rounded-lg cursor-pointer hover:border-neon-green/50 transition-colors"
                >
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <p className="text-gray-400 text-sm mt-2">Clique para upload</p>
                    </div>
                  )}
                </label>
              </div>
            </div>
          </div>

          {/* Coluna direita */}
          <div className="space-y-4">
            <div>
              <Label className="text-white">Forma de Pagamento</Label>
              <select
                value={formData.paymentForm}
                onChange={(e) => handleInputChange('paymentForm', e.target.value)}
                className="w-full mt-1 bg-darker-blue border border-neon-green/30 text-white rounded-md px-3 py-2"
              >
                <option value="ate-2000">Até R$ 2.000 (50% + 50%)</option>
                <option value="acima-3000">Acima de R$ 3.000 (Entrada + Parcelas)</option>
              </select>
            </div>

            {formData.paymentForm === 'ate-2000' ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="entryValue" className="text-white">Entrada (50%)</Label>
                  <Input
                    id="entryValue"
                    type="number"
                    value={formData.entryValue}
                    onChange={(e) => handleInputChange('entryValue', e.target.value)}
                    className="bg-darker-blue border-neon-green/30 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="remainingValue" className="text-white">Na Entrega (50%)</Label>
                  <Input
                    id="remainingValue"
                    type="number"
                    value={formData.remainingValue}
                    onChange={(e) => handleInputChange('remainingValue', e.target.value)}
                    className="bg-darker-blue border-neon-green/30 text-white"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="entryValueParcel" className="text-white">Valor da Entrada (R$)</Label>
                  <Input
                    id="entryValueParcel"
                    type="number"
                    value={formData.entryValue}
                    onChange={(e) => handleInputChange('entryValue', e.target.value)}
                    className="bg-darker-blue border-neon-green/30 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="monthlyValue" className="text-white">Valor Mensal (R$)</Label>
                    <Input
                      id="monthlyValue"
                      type="number"
                      value={formData.monthlyValue}
                      onChange={(e) => handleInputChange('monthlyValue', e.target.value)}
                      className="bg-darker-blue border-neon-green/30 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="months" className="text-white">Quantidade de Meses</Label>
                    <Input
                      id="months"
                      type="number"
                      value={formData.months}
                      onChange={(e) => handleInputChange('months', e.target.value)}
                      className="bg-darker-blue border-neon-green/30 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <Label htmlFor="description" className="text-white">Descrição do Projeto</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="bg-darker-blue border-neon-green/30 text-white h-24"
                placeholder="Descreva os detalhes do projeto..."
              />
            </div>

            <div>
              <Label htmlFor="emailRecipient" className="text-white">Email do Destinatário</Label>
              <Input
                id="emailRecipient"
                type="email"
                value={formData.emailRecipient}
                onChange={(e) => handleInputChange('emailRecipient', e.target.value)}
                className="bg-darker-blue border-neon-green/30 text-white"
                placeholder="email@exemplo.com"
              />
            </div>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex flex-wrap gap-3 p-4 border-t border-neon-green/30">
          <Button
            onClick={generatePDF}
            className="bg-dark-green hover:bg-neon-green hover:text-black text-white"
          >
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF
          </Button>
          
          <Button
            onClick={saveToFolder}
            className="bg-dark-blue hover:bg-dark-blue/80 text-white border border-neon-green/30"
          >
            Salvar em Pasta
          </Button>
          
          <Button
            onClick={sendEmail}
            className="bg-orange-accent hover:bg-orange-accent/80 text-black"
          >
            <Send className="h-4 w-4 mr-2" />
            Enviar Email
          </Button>
          
          <Button
            onClick={resetForm}
            variant="outline"
            className="border-neon-green/30 text-white hover:bg-neon-green/10"
          >
            Limpar Formulário
          </Button>
          
          <Button
            onClick={onClose}
            variant="destructive"
            className="ml-auto"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetModal;
